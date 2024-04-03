const categoryModel = require('../services/categories.js')

class Category {
  idCategory
  category
  products = []

  constructor (idCategory, category) {
    this.idCategory = idCategory
    this.category = category
  }

  async save (req, res) {
    try {
      categoryModel.insertMany(this)
      res.send('The action succfully')
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = { Category }
