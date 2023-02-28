const express = require('express')
const Article = require('../models/article.model')
const router = express.Router()
const upload = require('../middlewares/file-upload')
multipart_parser = require('@krvinay/multipart-body-parser')
var path = require('path')
var fs = require('fs')
let dummyImg =
  '1677568239035_8404445081R580Hj4j2hinfoTonPoo_No_image_available.png'
let dir = path.join(__dirname, '../uploads')

router.get('/', async (req, res) => {
  try {
    const data = await Article.find()
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})
router.post(
  '/',
  upload.single('customFile'),

  async (req, res) => {
    try {
      const { filename: file = dummyImg } = req.file || {}
      const category = req.body.category.split(',')
      const tags = req.body.tags.split(',')

      const data = await Article.create({
        ...req.body,
        tags,
        category,
        img: file
      })

      return res.status(200).send({ data })
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
)

router.get('/:id', async (req, res) => {
  try {
    const data = await Article.findById(req.params.id).lean().exec()
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err)
  }
})

router.put('/', async (req, res) => {
  try {
    const { id, value } = req.body
    const filter = { _id: id }
    const update = value
    await Article.findOneAndUpdate(filter, update)
    const data = await Article.find(filter)
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.put('/body', upload.single('customFile'), async (req, res) => {
  try {
    const { _id: id, value } = req.body
    const { filename: file = dummyImg } = req.file || {}
    const filter = { _id: id }
    const category = req.body.category.split(',')
    const tags = req.body.tags.split(',')
    const update = { ...value, img: file, category, tags }

    let existingArticle = await Article.findById(id)

    if (existingArticle.img !== dummyImg) {
      fs.unlink(`${dir}/${existingArticle.img}`, err => {
        if (err) console.log(err)
      })
    }
    await Article.findOneAndUpdate(filter, update)
    const data = await Article.find(filter)
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id = '' } = req.params

    let existingArticle = await Article.findById(id)
    if (existingArticle.img !== dummyImg) {
      fs.unlink(`${dir}/${existingArticle.img}`, err => {
        if (err) console.log(err)
      })
    }

    await Article.deleteOne({ _id: id }).lean().exec()
    const data = await Article.find()
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

module.exports = router
