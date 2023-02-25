import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleUpdate } from "../../utilities";

const ArticleDetail = () => {
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  if (!localUser) {
    navigate("/");
  }
  console.log("localUser", localUser);
  let { id: articleId } = useParams();
  const [article, setArticle] = useState({});
  const [category, setCategory] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  let processedCategoryObject = {};
  category.forEach(({ _id, categoryName }) => {
    processedCategoryObject[_id] = categoryName;
  });
  let processedUserObject = {};
  allUsers.forEach(({ _id, firstName, lastName }) => {
    processedUserObject[_id] = `${firstName} ${lastName}`;
  });

  useEffect(() => {
    console.log("coming");
    const dataFetch = async () => {
      axios
        .get(`https://busy-plum-bee-cuff.cyclic.app/article/${articleId}`)
        .then(function (data) {
          setArticle(data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/category")
        .then(function (data) {
          setCategory(data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/user")
        .then(function (data) {
          setAllUsers(data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    dataFetch();
    console.log("ddd");
  }, []);

  const likeButtonPress = async (article) => {
    if (article.likes.includes(localUser.id)) {
      return;
    }

    const newLikeList = [...article.likes, localUser.id];

    if (article.dislikes.includes(localUser.id)) {
      var index = article.dislikes.indexOf(localUser.id);

      const newDislikeList = [
        ...article.dislikes.slice(0, index),
        ...article.dislikes.slice(index + 1),
      ];

      const value = { dislikes: newDislikeList, likes: newLikeList };

      const data = await articleUpdate(article._id, value);
      console.log("data", data);
      setArticle({ ...data[0] });

      return;
    }

    const value = { likes: newLikeList };

    const data = await articleUpdate(article._id, value);
    setArticle({ ...data[0] });
  };

  const dislikeButtonPress = async (article) => {
    if (article.dislikes.includes(localUser.id)) {
      return;
    }

    const newDislikeList = [...article.dislikes, localUser.id];

    if (article.likes.includes(localUser.id)) {
      var index = article.likes.indexOf(localUser.id);

      const newLikeList = [
        ...article.likes.slice(0, index),
        ...article.likes.slice(index + 1),
      ];

      const value = { dislikes: newDislikeList, likes: newLikeList };

      const data = await articleUpdate(article._id, value);
      setArticle({ ...data[0] });
      return;
    }

    const value = { dislikes: newDislikeList };

    const data = await articleUpdate(article._id, value);
    setArticle({ ...data[0] });
  };

  const blockButtonPress = async (article) => {
    if (article.blockList.includes(localUser.id)) {
      return;
    }

    const newBlockList = [...article.blockList, localUser.id];
    const value = { blockList: newBlockList };

    await articleUpdate(article._id, value);
    navigate("/dashboard");
  };

  if (!article.title) {
    return <div>loader</div>;
  }

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
        <div> {processedUserObject[article.author]} </div>
        <div>
          {" "}
          {article.category.map((category) => (
            <>{processedCategoryObject[category]}</>
          ))}{" "}
        </div>
        <div>
          {article.tags.length ? (
            <div>
              Tags :
              {article.tags.map((tag) => (
                <span>{tag}</span>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
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
