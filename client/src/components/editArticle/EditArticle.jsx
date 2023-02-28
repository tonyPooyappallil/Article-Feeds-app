import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleBodyUpdate } from "../../utilities";
import ArticleForm from "../articleFrom";
import { ArticleFormContainer } from "../customStyledCompnents";

const EditArticle = () => {
  let { id: articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});

  useEffect(() => {
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

  const submitEdit = async (formData) => {
    formData.delete("likes");
    formData.delete("blockList");
    formData.delete("dislikes");
    formData.append("articleId", articleId);
    await articleBodyUpdate(formData);
    navigate("dashboard/article-list-page");
    console.log("formData", formData);
  };

  return (
    <ArticleFormContainer>
      <ArticleForm
        dataPoster={submitEdit}
        existingArticle={{ ...article }}
      ></ArticleForm>
    </ArticleFormContainer>
  );
};

export default EditArticle;
