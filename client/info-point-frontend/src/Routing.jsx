import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard";
import ArticleDetail from "./components/dashboard/ArticleDetail";
import Settings from "./components/settingPage";
import CreateArticle from "./components/createArticle";
import ArticleList from "./components/articleListPage";

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<ArticleDetail />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/create-new-article" element={<CreateArticle />} />
      <Route path="/article-list-page" element={<ArticleList />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
