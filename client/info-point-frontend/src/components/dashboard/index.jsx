import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, UserContext } from "../../context";
import ArticleWall from "./ArticleWall";
import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "95%",
  margin: "auto",
});

const LeftNav = styled.div({
  width: "20%",
  backgroundColor: "white",
  border: "1px solid black",
  // position: "relative",
  // top: "0px",
});

const ArticleWallDiv = styled.div({
  width: "80%",
  marginLeft: "2.5%",
  img: {
    width: "100%",
  },
});

const Dashboard = () => {
  const location = useLocation();
  const { loggedIn, setLogin } = useContext(AppContext);
  const { user, setUserContext } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const localUSer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const dataFetch = async () => {
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/article")
        .then(function (data) {
          setArticles(data.data.data);
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
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const articleUpdate = (id, value) => {
    console.log();
    axios
      .put("https://busy-plum-bee-cuff.cyclic.app/article", {
        id,
        value,
      })
      .then(function (data) {
        setArticles(data.data.data);
        console.log("article", data.data.data);
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up"
        );
      });
  };

  if (!localUSer) {
    console.log("inside");
    navigate("/");
  }
  return (
    <div>
      <div>
        <div>
          <h2>InfoPoint</h2>{" "}
          <div>
            <span>{user.firstName || localUSer.firstName}</span>{" "}
            <button onClick={() => logout()}>logout</button>{" "}
          </div>
        </div>

        <Container>
          <LeftNav>left nav</LeftNav>
          <ArticleWallDiv>
            <ArticleWall
              articles={articles}
              category={category}
              users={allUsers}
              loggedInUser={localUSer}
              articleUpdate={articleUpdate}
            ></ArticleWall>
          </ArticleWallDiv>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
