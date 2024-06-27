const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const mongoDB = process.env.DATABASE_URL
main().catch((err) => console.log(err))
async function main () {
  await mongoose.connect(mongoDB)
}
const Schema = mongoose.Schema

const usersSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  dob: { type: String }
})

module.exports = mongoose.model('usersModel', usersSchema)
