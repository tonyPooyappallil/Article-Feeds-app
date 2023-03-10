const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    mobileNum: { type: Number, required: true },
    password: { type: String, required: true },
    interests: [
      { type: Schema.Types.ObjectId, ref: 'Category', required: false }
    ],
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article', required: false }]
  },
  {
    versionKey: false
  }
)

userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword
  return next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.password) {
      const hashed = await bcrypt.hash(this._update.password, 10)
      this._update.password = hashed
    }
    next()
  } catch (err) {
    return next(err)
  }
})

userSchema.methods.verifyPassword = function (password) {
  const hashedPassword = this.password
  return bcrypt.compareSync(password, hashedPassword)
}

const User = mongoose.model('user', userSchema)

module.exports = User
