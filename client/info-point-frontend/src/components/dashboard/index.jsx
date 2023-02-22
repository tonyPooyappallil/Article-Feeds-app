import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext, UserContext } from "../../context";
import ArticleWall from "./ArticleWall";
import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
});

const Dashboard = () => {
  const location = useLocation();
  const { loggedIn, setLogin } = useContext(AppContext);
  const { user, setUserContext } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/article")
        .then(function (data) {
          setArticles(data.data.data);
          console.log("article", data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/category")
        .then(function (data) {
          setCategory(data.data.data);
          console.log("category", data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/user")
        .then(function (data) {
          setAllUsers(data.data.data);
          console.log("all user", data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    dataFetch();
  }, []);

  return (
    <div>
      <div>
        <h2>InfoPoint</h2>
        <Container>
          <div>left nav</div>
          <ArticleWall
            articles={articles}
            category={category}
            users={allUsers}
          ></ArticleWall>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
