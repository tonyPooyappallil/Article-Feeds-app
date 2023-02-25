import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, UserContext } from "../../context";
import ArticleWall from "./ArticleWall";
import styled from "styled-components";
import LeftNav from "./LeftNav";
import { MyButton } from "../customStyledCompnents";

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
  width: "85%",
  img: {
    width: "100%",
  },
});

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 5px;
  position: sticky;
  top: 0;
  background-color: #6fa4ff;
`;

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 26px;
  padding: 15px;
`;

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
            <ProfileContainer>
              <UserNameContainer>
                <span>Hey {user.firstName || localUSer.firstName} !</span>{" "}
              </UserNameContainer>
              <div>
                <MyButton onClick={() => logout()}>logout</MyButton>{" "}
              </div>
            </ProfileContainer>
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
