import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleWall from "./ArticleWall";

const Dashboard = () => {
  const navigate = useNavigate();
  const localUSer = JSON.parse(localStorage.getItem("user"));
  if (!localUSer) {
    navigate("/");
  }

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

  return (
    <div>
      <div>
        <ArticleWall
          articles={articles}
          category={category}
          users={allUsers}
          loggedInUser={localUSer}
        ></ArticleWall>
      </div>
    </div>
  );
};

export default Dashboard;
