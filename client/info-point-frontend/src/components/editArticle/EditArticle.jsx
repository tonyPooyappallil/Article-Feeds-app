import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleUpdate } from "../../utilities";
import ArticleForm from "../articleFrom";

const EditArticle = () => {
  let { id: articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});

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
    };
    dataFetch();
  }, []);

  const submitEdit = async (data) => {
    const { _id: id, blockList, likes, dislikes, ...actualData } = data;
    await articleUpdate(id, actualData);
    navigate("/article-list-page");
  };

  console.log("article in edit main", article);
  return (
    <div>
      <ArticleForm
        dataPoster={submitEdit}
        existingArticle={{ ...article }}
      ></ArticleForm>
    </div>
  );
};

export default EditArticle;
