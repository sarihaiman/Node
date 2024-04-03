const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const mongoDB = process.env.DATABASE_URL
main().catch((err) => console.log(err))
async function main () {
  await mongoose.connect(mongoDB)
}
const Schema = mongoose.Schema

const categorySchema = new Schema({
  idCategory: { type: Number },
  category: { type: String },
  products: [{ id: { type: Number }, name: { type: String } }]
})

module.exports = mongoose.model('categoryModel', categorySchema)
