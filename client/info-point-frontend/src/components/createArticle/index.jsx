import React from "react";
import { useNavigate } from "react-router-dom";
import { articleCreate } from "../../utilities";
import ArticleForm from "../articleFrom";

const CreateArticle = () => {
  const localUSer = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (!localUSer) {
    navigate("/");
  }

  return (
    <div>
      <ArticleForm
        existingArticle={{}}
        dataPoster={articleCreate}
      ></ArticleForm>{" "}
    </div>
  );
};

export default CreateArticle;
