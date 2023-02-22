import React, { useEffect, useState } from "react";

const ArticleWall = ({ articles, category, users }) => {
  const [mappedArticles, setmappedArticles] = useState([]);
  console.log("articles, category, user", articles, category, users);
  useEffect(() => {
    let processedCategoryObject = {};
    category.forEach(({ _id, categoryName }) => {
      processedCategoryObject[_id] = categoryName;
    });
    console.log("processedCategoryObject", processedCategoryObject);
    let processedUserObject = {};
    users.forEach(({ _id, firstName, lastName }) => {
      processedUserObject[_id] = `${firstName} ${lastName}`;
    });
    console.log("processedUserObject", processedUserObject);

    const mappedArticleData = articles.map((item) => {
      return {
        ...item,
        author: processedUserObject[item.author],
        category: processedCategoryObject[item.category],
      };
    });
    setmappedArticles(mappedArticleData);
    console.log("mappedArticleData", mappedArticleData);
  }, [articles, category, users]);

  return (
    <div>
      {" "}
      {mappedArticles.map((article) => (
        <div>
          <div>
            <img src={article.img} alt="" />{" "}
          </div>
          <div>
            {" "}
            <h2>{article.title} </h2>{" "}
          </div>
          <div>{article.description}</div>
          <div>
            <div> {article.author} </div>
            <div> {article.category} </div>
            <div> like {article.likes.length} </div>
            <div> dislike {article.dislikes.length} </div>
            <div>block</div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleWall;
