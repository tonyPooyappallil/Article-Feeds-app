const express = require("express");
const Article = require("../models/article.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Article.find();
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Article.create(req.body);
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Article.findById(req.params.id).lean().exec();
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
