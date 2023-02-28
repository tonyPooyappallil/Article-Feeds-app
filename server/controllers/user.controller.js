const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const bcrypt = require('bcrypt')
const emailValidator = require('email-validator')

router.get('/', async (req, res) => {
  try {
    const data = await User.find()
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const { email, mobileNum } = req.body

    if (!emailValidator.validate(email)) {
      throw new Error('Please use a valid email id')
    }

    const user = await User.find({
      $or: [{ email }, { mobileNum }]
    })
      .lean()
      .exec()
    if (user.length) {
      throw new Error(
        'Email or Mobile number already exists. Please login or try with different input'
      )
    }

    const data = await User.create(req.body)
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await User.findById(req.params.id).lean().exec()
    return res.status(200).send({ data })
  } catch (err) {
    return res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body

    let user
    if (isNaN(id)) {
      user = await User.findOne({ email: id.toLowerCase() }).lean().exec()
    } else {
      user = await User.findOne({ mobileNum: id }).lean().exec()
    }

    if (!user) {
      throw new Error("User doesn't exists. Please register")
    }
    let passwordVerification = bcrypt.compareSync(password, user.password)
    if (passwordVerification) {
    } else {
    }
    if (!passwordVerification) {
      throw new Error('Incorrect password')
    }

    const {
      firstName,
      lastName,
      dateOfBirth,
      _id,
      email,
      mobileNum,
      interests,
      articles
    } = user
    return res.status(200).send({
      success: true,
      firstName,
      lastName,
      dateOfBirth,
      id: _id,
      email,
      mobileNum,
      interests,
      articles
    })
  } catch (err) {
    return res.status(400).send(err)
  }
})

router.put('/', async (req, res) => {
  try {
    const { id, value } = req.body
    const filter = { _id: id }
    const update = value
    await User.findOneAndUpdate(filter, update)
    const data = await User.findOne(filter)

    const {
      firstName,
      lastName,
      dateOfBirth,
      _id,
      email,
      mobileNum,
      interests,
      articles
    } = data

    return res.status(200).send({
      firstName,
      lastName,
      dateOfBirth,
      id: _id,
      email,
      mobileNum,
      interests,
      articles
    })
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

module.exports = router
