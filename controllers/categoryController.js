const app = require('express').Router()
const bodyParser = require('body-parser')

const categoryModel = require('../services/categories.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

  const getPro= async (req, res) => {
    const categoryList = await categoryModel.find()
    const arr = []
    categoryList.forEach(c => {
      arr.push(c.category)
    })
    // res.send(arr.toSorted())  addddddddddddddddddddd
    res.send(arr)
  }

  const getProId=async (req, res) => {
    const categoryList = await categoryModel.find()
    const id = Number(req.params.id)
    const category = categoryList.find(c => c.idCategory === id)
    if (!category) {
      res.status(404).send('category not found')
    }
    res.send(category.category)
  }

  const postPro= (req, res) => {
    const { Category } = require('../models/Category')
    const c = new Category(Number(req.body.id), req.body.name)
    c.save(req, res)
  }

  const deletePro=async (req, res) => {
    try {
      await categoryModel.deleteOne({ idCategory: req.params.id })
    } catch (err) {
      console.error(err)
    }
    res.send('Delete ' + req.params.id)
  }

  const putPro=async (req, res) => {
    try {
      const id = Number(req.body.id)
      const data = req.body
      await categoryModel.updateOne({
        idCategory: id
      }, {
        $set: {
          category: data.name
        }
      })
      res.send('Update ' + id)
    } catch (err) {
      res.send('error!!!')
    }
  }
module.exports = {getPro,getProId,postPro,putPro,deletePro}
