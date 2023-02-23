import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard";
import ArticleDetail from "./components/dashboard/ArticleDetail";

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<ArticleDetail />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
