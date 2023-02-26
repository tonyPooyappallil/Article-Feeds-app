import React from "react";
import { useNavigate } from "react-router-dom";
import { articleCreate } from "../../utilities";
import ArticleForm from "../articleFrom";
import { ArticleFormContainer } from "../customStyledCompnents";

const CreateArticle = () => {
  const localUSer = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (!localUSer) {
    navigate("/");
  }

  return (
    <ArticleFormContainer>
      <ArticleForm
        existingArticle={{}}
        dataPoster={articleCreate}
      ></ArticleForm>{" "}
    </ArticleFormContainer>
  );
};

export default CreateArticle;
