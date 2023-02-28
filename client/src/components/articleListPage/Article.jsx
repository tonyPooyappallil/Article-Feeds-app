import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../customStyledCompnents";
import styled from "styled-components";
import { getImg } from "../../utilities";
const Article = ({ article = {}, deleteArticle }) => {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div>
          <img src={getImg(article.img)} alt="" />
        </div>
        <div>
          <div>
            <h2> {article.title}</h2>
          </div>
        </div>
        <div>
          <div>{article.description}</div>
        </div>
        <StatisticsSection>
          <div>
            <div>Total likes - {article.likes.length}</div>
          </div>
          <div>
            <div>Total dislikes - {article.dislikes.length}</div>
          </div>
          <div>
            <div>Total Block count - {article.blockList.length}</div>
          </div>
        </StatisticsSection>

        <div>
          <MyButton
            backgroundColor="#0a51dfc7"
            color="white"
            onClick={() => {
              navigate(`edit/${article._id}`);
            }}
          >
            Edit
          </MyButton>
        </div>
        <ButtonSection>
          <div>
            <MyButton
              backgroundColor="#e90000e1"
              color="black"
              onClick={() => {
                setShowWarning(true);
              }}
            >
              Delete this Article
            </MyButton>
          </div>
          {showWarning && (
            <div>
              <div>
                This cannot be undone, are you sure about deleting this Article?
              </div>

              <MyButton
                backgroundColor="#cf0707c5"
                color="black"
                onClick={() => {
                  deleteArticle(article._id);
                }}
              >
                Yes
              </MyButton>
              <MyButton
                backgroundColor="#f75252f5"
                color="white"
                onClick={() => {
                  setShowWarning(false);
                }}
              >
                No
              </MyButton>
            </div>
          )}
        </ButtonSection>
      </div>
    </div>
  );
};

export default Article;

const StatisticsSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  > div {
    background-color: #e2e2e2;
    padding: 9px;
    border-radius: 12px;
  }
`;

const ButtonSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  div {
    padding: 9px;
    border-radius: 12px;
  }

  * button {
    margin: 5px;
  }
`;
