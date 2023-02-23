import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ArticleWall = ({
  articles,
  category,
  users,
  loggedInUser,
  articleUpdate,
}) => {
  const [mappedArticles, setmappedArticles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let processedCategoryObject = {};
    category.forEach(({ _id, categoryName }) => {
      processedCategoryObject[_id] = categoryName;
    });
    let processedUserObject = {};
    users.forEach(({ _id, firstName, lastName }) => {
      processedUserObject[_id] = `${firstName} ${lastName}`;
    });

    const filteredArticleData = articles.filter(({ category, blockList }) => {
      return (
        category.some((item) => loggedInUser.interests.includes(item)) &&
        !blockList.includes(loggedInUser.id)
      );
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
    if (article.likes.includes(loggedInUser.id)) {
      return;
    }

    const newLikeList = [...article.likes, loggedInUser.id];

    if (article.dislikes.includes(loggedInUser.id)) {
      var index = article.dislikes.indexOf(loggedInUser.id);

      const newDislikeList = [
        ...article.dislikes.slice(0, index),
        ...article.dislikes.slice(index + 1),
      ];

      const value = { dislikes: newDislikeList, likes: newLikeList };

      articleUpdate(article._id, value);
      return;
    }

    const value = { likes: newLikeList };

    articleUpdate(article._id, value);
  };

  const dislikeButtonPress = (article) => {
    if (article.dislikes.includes(loggedInUser.id)) {
      return;
    }

    const newDislikeList = [...article.dislikes, loggedInUser.id];

    if (article.likes.includes(loggedInUser.id)) {
      var index = article.likes.indexOf(loggedInUser.id);

      const newLikeList = [
        ...article.likes.slice(0, index),
        ...article.likes.slice(index + 1),
      ];

      const value = { dislikes: newDislikeList, likes: newLikeList };

      articleUpdate(article._id, value);
      return;
    }

    const value = { dislikes: newDislikeList };

    articleUpdate(article._id, value);
  };

  const blockButtonPress = (article) => {
    if (article.blockList.includes(loggedInUser.id)) {
      return;
    }

    const newBlockList = [...article.blockList, loggedInUser.id];
    const value = { blockList: newBlockList };
    articleUpdate(article._id, value);
  };

  return (
    <div>
      {" "}
      {mappedArticles.map((article) => (
        <div
          onClick={() => {
            navigate(article._id, {
              state: {
                article,
                loggedInUser,
              },
            });
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
            <div
              onClick={() => {
                dislikeButtonPress(article);
              }}
            >
              {" "}
              dislike {article.dislikes.length}{" "}
            </div>
            <div
              onClick={() => {
                blockButtonPress(article);
              }}
            >
              block
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleWall;
