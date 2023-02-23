import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ArticleWall = ({ articles, category, users, loggedInUser }) => {
  const [mappedArticles, setmappedArticles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredArticleData = articles.filter(({ category, blockList }) => {
      return (
        category.some((item) => loggedInUser.interests.includes(item)) &&
        !blockList.includes(loggedInUser.id)
      );
    });

    setmappedArticles(filteredArticleData);
  }, [articles, category, users]);

  return (
    <div>
      {" "}
      {mappedArticles.map((article) => (
        <div
          onClick={() => {
            navigate(article._id);
          }}
        >
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
