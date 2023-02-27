const express = require('express')
const Article = require('../models/article.model')
const router = express.Router()
const upload = require('../middlewares/file-upload')
multipart_parser = require('@krvinay/multipart-body-parser')
var path = require('path')
var fs = require('fs')
let mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
}

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
      const category = req.body.category.split(',')
      const tags = req.body.tags.split(',')
      const file = req.file.path
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

router.get('/download', async (req, res) => {
  try {
    const { path: file } = req.body
    var type = mime[path.extname(file).slice(1)] || 'text/plain'
    var s = fs.createReadStream(file)
    s.on('open', function () {
      res.set('Content-Type', type)
      s.pipe(res)
    })
    s.on('error', function () {
      res.set('Content-Type', 'text/plain')
      res.status(404).end('Not found')
    })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

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

router.delete('/:id', async (req, res) => {
  try {
    const { id = '' } = req.params
    await Article.deleteOne({ _id: id }).lean().exec()
    const data = await Article.find()
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

module.exports = router
