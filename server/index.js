const express = require("express");
const connect = require("./configs/db");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const userController = require("./controllers/user.controller");
const articleController = require("./controllers/article.controller");
const categoryController = require("./controllers/category.controller");

app.use("/user", userController);
app.use("/article", articleController);
app.use("/category", categoryController);

app.listen(process.env.PORT || 3000, function () {
  connect();
  console.log("now listening for requests");
});
