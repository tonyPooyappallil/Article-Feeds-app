import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, UserContext } from "../../context";
import ArticleWall from "./ArticleWall";
import styled from "styled-components";
import LeftNav from "./LeftNav";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  margin: "auto",
});

const LeftNavContainer = styled.div({
  width: "15%",
  minWidth: "100px",
  backgroundColor: "#6fa4ff",
  position: "sticky",
  top: "0",
  height: "200px",
  borderBottomRightRadius: "15px",
});

const ArticleWallDiv = styled.div({
  width: "80%",
  marginLeft: "1.5%",
  img: {
    width: "100%",
  },
});

const Dashboard = () => {
  const navigate = useNavigate();
  const localUSer = JSON.parse(localStorage.getItem("user"));
  if (!localUSer) {
    navigate("/");
  }
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

  return (
    <div>
      <div>
        <Container>
          <LeftNavContainer>
            <LeftNav></LeftNav>
          </LeftNavContainer>
          <ArticleWallDiv>
            <div>
              <h2>InfoPoint</h2>{" "}
              <div>
                <span>{user.firstName || localUSer.firstName}</span>{" "}
                <button onClick={() => logout()}>logout</button>{" "}
              </div>
            </div>
            <ArticleWall
              articles={articles}
              category={category}
              users={allUsers}
              loggedInUser={localUSer}
            ></ArticleWall>
          </ArticleWallDiv>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
