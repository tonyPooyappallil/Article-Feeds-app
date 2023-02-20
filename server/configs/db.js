const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/infoPoint";
const connect = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
