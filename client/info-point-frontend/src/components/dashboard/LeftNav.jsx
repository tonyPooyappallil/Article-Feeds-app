import React from "react";
import { useNavigate } from "react-router-dom";

const LeftNav = () => {
  const navigate = useNavigate();

  return (
    <div>
      LeftNav
      <div
        onClick={() => {
          navigate("/create-new-article");
        }}
      >
        Post New Article
      </div>
      <div
        onClick={() => {
          navigate("/article-list-page");
        }}
      >
        My Articles
      </div>
      <div
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </div>
    </div>
  );
};

export default LeftNav;
