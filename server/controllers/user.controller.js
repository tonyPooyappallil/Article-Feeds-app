const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

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
  const { id, password } = req.body;
  console.log("id, password", id, password);
  try {
    let user;
    if (isNaN(id)) {
      user = await User.findOne({ email: id }).lean().exec();
    } else {
      user = await User.findOne({ mobileNum: id }).lean().exec();
    }

    if (!user) {
      return res
        .status(400)
        .send(new Error("User doesn't exists. Please register"));
    }
    let passwordVerification = await user.verifyPassword(password);
    if (!passwordVerification) {
      return res.status(400).send(new Error("Incorrect password"));
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
