import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleUpdate, useIsMobile } from "../../utilities";
import styled from "styled-components";
import {
  anotherLike,
  blockButton,
  dislikeButton,
  likeButton,
  newLike,
} from "../../svgExports";
import { MainContainer } from "../customStyledCompnents";

const ArticleDetail = () => {
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const isMobile = useIsMobile();

  if (!localUser) {
    navigate("/");
  }
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
  }, []);

  const getUserReactionStatus = (data) => {
    if (data.includes(localUser.id)) {
      return "blue";
    }
    return "black";
  };

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
    <MainContainer>
      <div>
        <img src={article.img} alt="" />{" "}
      </div>
      <div>
        {" "}
        <h2>{article.title} </h2>{" "}
      </div>
      <div>{article.description}</div>
      <div>
        <ReactionContainer>
          <LikeContainer
            onClick={() => {
              likeButtonPress(article);
            }}
          >
            <div> {likeButton(getUserReactionStatus(article.likes))} </div>{" "}
            <div> {article.likes.length} </div>
          </LikeContainer>
          <LikeContainer
            onClick={() => {
              dislikeButtonPress(article);
            }}
          >
            <div>{dislikeButton(getUserReactionStatus(article.dislikes))}</div>{" "}
            <div>{article.dislikes.length} </div>
          </LikeContainer>
          <LikeContainer
            onClick={() => {
              blockButtonPress(article);
            }}
          >
            <div>{blockButton}</div> <div>Block this Article </div>
          </LikeContainer>
        </ReactionContainer>
        <AuthorContainer>
          <div>
            <h4>Author</h4>
          </div>
          <div> {processedUserObject[article.author]}</div>
        </AuthorContainer>

        <CatTagContainer>
          <div>
            <div>
              {" "}
              <h4>Category</h4>{" "}
            </div>
            <div>
              {article.category.map((category, index) => (
                <>
                  {processedCategoryObject[category]}
                  {index === article.category.length - 1 ? "" : ",  "}
                </>
              ))}
            </div>
          </div>
          <div>
            <div>
              <h4>Tags</h4>
            </div>
            <div>
              {article.tags.length ? (
                <div>
                  {article.tags.map((tag, index) => (
                    <span>
                      {tag}
                      {index === article.tags.length - 1 ? "" : ",    "}
                    </span>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </CatTagContainer>
      </div>
    </MainContainer>
  );
};

export default ArticleDetail;

//  padding: ${(props) => (props.isMobile ? "5px" : "15px")};

const ReactionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  > div {
    padding: 20px;
    > div {
      padding: 3px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      :nth-child(1):hover {
        padding-right: 8px;
      }
    }
  }
`;

const LikeContainer = styled.div`
  /* background-color: black; */

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AuthorContainer = styled.div`
  /* background-color: black; */

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  background-color: #e6e6e6;
  width: 25%;
  min-width: 200px;
  border-radius: 20px;
  div {
    padding: 10px;
    font-weight: 400;
  }
  margin: 4px;
`;

const CatTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    background-color: #e6e6e6;
    border-radius: 20px;
    padding: 3px;
    font-weight: 400;
    margin: 4px;
    div {
      padding: 3px;
    }
  }
`;
