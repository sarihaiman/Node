const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const cors = require('cors')
const products = require('./controllers/productsController.js')
const categories = require('./controllers/categoryController.js')
const users = require('./controllers/usersController.js')
const details = require('./Middlewares/Details.js')
const checkBode = require('./Middlewares/checkBode.js')
const checkToken = require('./Middlewares/checkToken.js')

app.use(cors())
const options = {
  origin: ['http://localhost:3000', 'http://localhost:8080']
}
app.use(cors(options))
app.use(details)
app.use(checkBode)
app.use(users)
app.use(checkToken)

app.use((req, res, next) => {
  next()
})

app.use(products)
app.use(categories)

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`http://localhost:${PORT}`)
  } else { console.log("Error occurred, server can't start", error) }
})
