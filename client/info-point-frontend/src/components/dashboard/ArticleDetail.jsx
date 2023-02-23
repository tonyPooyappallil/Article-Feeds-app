import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ArticleDetail = () => {
  const {
    state: { article: routedArticle, loggedInUser },
  } = useLocation();

  const [article, setArticle] = useState(routedArticle);

  const articleUpdate = (id, value) => {
    console.log();
    axios
      .put("https://busy-plum-bee-cuff.cyclic.app/article", {
        id,
        value,
      })
      .then(function (data) {
        setArticle(data.data.data);
        console.log("article", data.data.data);
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up"
        );
      });
  };

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
  );
};

export default ArticleDetail;
