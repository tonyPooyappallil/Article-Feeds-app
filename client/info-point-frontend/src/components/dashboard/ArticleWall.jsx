import React, { useEffect, useState } from "react";

const ArticleWall = ({ articles, category, users, loggedInUser }) => {
  const [mappedArticles, setmappedArticles] = useState([]);
  useEffect(() => {
    let processedCategoryObject = {};
    category.forEach(({ _id, categoryName }) => {
      processedCategoryObject[_id] = categoryName;
    });
    let processedUserObject = {};
    users.forEach(({ _id, firstName, lastName }) => {
      processedUserObject[_id] = `${firstName} ${lastName}`;
    });

    const filteredArticleData = articles.filter(({ category }) => {
      return category.some((item) => loggedInUser.interests.includes(item));
    });

    console.log("filteredArticleData", filteredArticleData);

    const mappedArticleData = filteredArticleData.map((item) => {
      return {
        ...item,
        author: processedUserObject[item.author],
        category: processedCategoryObject[item.category],
      };
    });
    setmappedArticles(mappedArticleData);
    console.log("mappedArticleData", mappedArticleData);
  }, [articles, category, users]);

  const likeButtonPress = (article) => {
    console.log("article", article);
    console.log("loggedInUser", loggedInUser);

    if (article.likes.include(loggedInUser.id)) {
      return;
    }
  };

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
            <div
              onClick={() => {
                likeButtonPress(article);
              }}
            >
              {" "}
              like {article.likes.length}{" "}
            </div>
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
