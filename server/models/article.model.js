const mongoose = require('mongoose')
const Schema = mongoose.Schema
const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [
      { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    ],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    img: { type: String, required: false },
    blockList: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    comments: [
      {
        by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        value: { type: String, required: true }
      }
    ],
    tags: [{ type: String, required: false }]
  },
  {
    versionKey: false
  }
)

const Article = mongoose.model('article', articleSchema)

module.exports = Article
