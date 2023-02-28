const express = require('express')
const connect = require('./configs/db')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
var path = require('path')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// for parsing application/json
app.use(bodyParser.json())

const userController = require('./controllers/user.controller')
const articleController = require('./controllers/article.controller')
const categoryController = require('./controllers/category.controller')

let dir = path.join(__dirname, '/uploads')

app.use(express.static(dir))
app.use('/user', userController)
app.use('/article', articleController)
app.use('/category', categoryController)

const PORT = process.env.PORT || 3005
connect().then(() => {
  app.listen(PORT, () => {
    console.log('listening for any requests')
  })
})
