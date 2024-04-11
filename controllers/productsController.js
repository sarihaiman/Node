const app = require('express').Router()
const bodyParser = require('body-parser')
const categoryModel = require('../services/categories.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


  const getproduct=async (req, res) => {
    const products = await categoryModel.find()
    let arr = products.find(p => p.category === String(req.params.category))
    if (!arr) {
      res.status(404).send('Category not found')
      return
    }
    arr = arr.products
    // res.send(arr.toSorted((a, b) => a.name.localeCompare(b.name))) addddddddddddd
    res.send(arr)
  }

  const getProductById=async (req, res) => {
    const products = await categoryModel.find()
    let arr = products.find(p => p.category === req.params.category)
    if (!arr) {
      res.status(404).send('Category not found')
      return
    }
    arr = arr.products
    const id = Number(req.params.id)
    const product = arr.find(product => product.id === id)
    if (!product) {
      res.status(404).send('product not found')
    }
    res.send(product)
  }

  const postProductasync =(req, res) => {
    const { Product } = require('../models/Product')
    const p = new Product(Number(req.body.id), req.body.name)
    p.save(req, res)
  }

  const deleteProduct=async (req, res) => {
    try {
      const products = await categoryModel.find()
      let arr = products.find(p => p.category === req.params.category)
      if (!arr) {
        res.status(404).send('Category not found')
        return
      }
      arr = arr.products
      const id = req.params.id
      arr = arr.filter(e => e.id != id)
      await categoryModel.updateOne({
        category: req.params.category
      }, {
        $set: {
          products: arr
        }
      })
    } catch (err) {
      console.error(err)
    }
    res.send('Delete!')
  }

  const putProduct=async (req, res) => {
    try {
      const products = await categoryModel.find()
      let arr = products.find(p => p.category === req.params.category)
      if (!arr) {
        res.status(404).send('Category not found')
        return
      }
      arr = arr.products
      const id = Number(req.body.id)
      const data = req.body
      const product = arr.find(p => p.id === id)
      if (product == null) {
        console.log('the product not found')
      }
      product.name != null && data.name != null ? product.name = data.name : console.log('name was not updated')
      await categoryModel.updateOne({
        category: req.params.category
      }, {
        $set: {
          products: arr
        }
      })
      res.send('Update: ' + JSON.stringify(product))
    } catch (err) {
      res.send('error!!!')
    }
  }


module.exports = {getProductById,getproduct,postProductasync,putProduct,deleteProduct}
