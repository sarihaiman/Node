const app = require('express').Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const usersModel = require('../services/users.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requireCategories () {
  const usersList = await usersModel.find()
  console.log(usersList)
  const secret = process.env.SECRET_KEY
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body
      if (!(email && password)) {
        res.status(400).send('All input is required')
      }
      const user = await usersModel.findOne({ email })

      console.log(user)

      console.log(password + '--' + user.password + '--' + (await bcrypt.compare(password, String(user.password))))
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
  })

  app.post('/signup', async (req, res) => {
    const hasPassword = await bcrypt.hash(req.body.password, 10)

    const user = {
      email: req.body.email,
      name: req.body.name,
      password: hasPassword,
      dob: req.body.dob
    }

    usersModel.insertMany(user)

    res.send(user)
  })
}

requireCategories()

module.exports = app
