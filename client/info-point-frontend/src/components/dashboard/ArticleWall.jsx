import React, { useEffect } from "react";

const ArticleWall = ({ articles, category, users }) => {
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
    console.log("mappedArticleData", mappedArticleData);
  }, [articles, category, users]);

  return (
    <div>
      {" "}
      {articles.map((article) => (
        <div>
          <div>
            <img src={article.img} alt="" />{" "}
          </div>
          <div>
            {" "}
            <h2>{article.title} </h2>{" "}
          </div>
          <div>{article.description}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleWall;
