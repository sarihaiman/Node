const app = require('express').Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const usersModel = require('../services/users.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const secret = process.env.SECRET_KEY
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    const user = await usersModel.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      // if (user) {
      console.log('if')
      const token = jwt.sign({ user_id: user._id, email },
        secret, {
        expiresIn: '2h'
      }
      )

      res.status(200).json(token)
    } else {
      console.log('else')
      res.status(400).send('Invalid Credentials')
    }
  } catch (err) {
    console.log(err)
  }
}

const signUp = async (req, res) => {
  const hasPassword = await bcrypt.hash(req.body.password, 10)
  const user = {
    email: req.body.email,
    name: req.body.name,
    password: hasPassword,
    dob: req.body.dob
  }

  usersModel.insertMany(user)

  res.send(user)
}

module.exports = { login, signUp }

