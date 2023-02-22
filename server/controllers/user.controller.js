const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await User.create(req.body);
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id).lean().exec();
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body;
    console.log("id, password", id, password);
    console.log("inside try");
    let user;
    if (isNaN(id)) {
      console.log("inside if");

      user = await User.findOne({ email: id }).lean().exec();
    } else {
      console.log("inside else");

      user = await User.findOne({ mobileNum: id }).lean().exec();
    }
    console.log("user", user);

    if (!user) {
      throw new Error("User doesn't exists. Please register");
    }
    console.log("before pas ver");
    let passwordVerification = bcrypt.compareSync(password, user.password);
    if (passwordVerification) {
      console.log("Password correct");
    } else {
      console.log("Password wrong");
    }
    console.log("after pass ver");
    if (!passwordVerification) {
      throw new Error("Incorrect password");
    }

    const {
      firstName,
      lastName,
      dateOfBirth,
      _id,
      email,
      mobileNum,
      interests,
      articles,
    } = user;
    return res.status(200).send({
      success: true,
      firstName,
      lastName,
      dateOfBirth,
      id: _id,
      email,
      mobileNum,
      interests,
      articles,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
