const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const cors = require('cors')
const products = require('./router/product_router.js')
const categories = require('./router/category_router.js')
const users = require('./router/user_router.js')
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
// app.use(checkToken)  to add addddddddd

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
