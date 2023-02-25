import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "./Article";

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
          console.log("localUSer.id", localUSer.id);
          let mappedData = data.data.data.filter(
            ({ author }) => author === localUSer.id
          );

          setArticles(mappedData);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    dataFetch();
  }, []);

  return (
    <div>
      <h1>Your Articles</h1>
      <div>
        {articles.map((article) => (
          <Article article={article}></Article>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
