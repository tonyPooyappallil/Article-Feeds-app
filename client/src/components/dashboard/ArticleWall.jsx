import { truncate } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useIsMobile } from "../../utilities";

const ArticleWall = ({ articles, category, users, loggedInUser }) => {
  const [mappedArticles, setmappedArticles] = useState([]);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const filteredArticleData = articles.filter(({ category, blockList }) => {
      return (
        category.some((item) => loggedInUser.interests.includes(item)) &&
        !blockList.includes(loggedInUser.id)
      );
    });

    setmappedArticles(filteredArticleData);
  }, [articles, category, users]);

  return (
    <ArticleWallContainer isMobile={isMobile}>
      {mappedArticles
        .map((article) => (
          <div
            onClick={() => {
              navigate(article._id);
            }}
          >
            <div>
              <img src={article.img} alt="" />{" "}
            </div>
            <div>
              {" "}
              <h2>{article.title} </h2>{" "}
            </div>
            <div>
              {" "}
              {truncate(article.description)} {}
            </div>
          </div>
        ))
        .reverse()}
    </ArticleWallContainer>
  );
};

export default ArticleWall;

const ArticleWallContainer = styled.div`
  display: ${(props) => (props.isMobile ? "" : "grid")};
  grid-template-columns: ${(props) => (props.isMobile ? "" : "auto auto auto")};
  background-color: #ffffff;
  color: black;
  padding: ${(props) => (props.isMobile ? "5px 0px 50px 0px" : "")};

  > div {
    border: 2px solid #e6e6e6;
    cursor: pointer;
    :hover {
      padding-right: 2px;
    }
    div:nth-of-type(3) {
      margin-top: -10px;
    }
  }
  div {
    margin: 10px;
    background-color: #f7f5f5;
    padding: 5px;
    border-radius: 25px;
  }
`;
