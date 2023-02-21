const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/infoPoint";
const connect = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connect;
