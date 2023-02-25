import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { articleDelete } from "../../utilities";
import Article from "./Article";

const authorArticleFilter = (articles, useId) => {
  return articles.filter(({ author }) => author === useId);
};

const ArticleList = () => {
  const localUSer = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (!localUSer) {
    navigate("/");
  }

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/article")
        .then(function (data) {
          setArticles(authorArticleFilter(data.data.data, localUSer.id));
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    dataFetch();
  }, []);

  const deleteArticle = async (id) => {
    const data = await articleDelete(id);
    console.log("data after dekleting", data);
    setArticles(authorArticleFilter(data, localUSer.id));
  };

  return (
    <div>
      <h1>Your Articles</h1>
      <div>
        {articles.map((article) => (
          <Article article={article} deleteArticle={deleteArticle}></Article>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
