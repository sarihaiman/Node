const dataModel = require('../services/categories.js')

class Product {
  id
  name
  constructor (id, name) {
    this.id = id
    this.name = name
  }

  async save (req, res) {
    try {
      const productsList = await dataModel.find()
      const thisCategory = productsList.find(p => p.category === req.params.category)
      if (!thisCategory) {
        res.status(404).send('Category not found')
      }
      let arr
      productsList.forEach(p => {
        if (p.category === req.params.category) {
          arr = p.products
        }
      })
      arr.push(this)
      await dataModel.updateOne({
        category: req.params.category
      }, {
        $set: {
          products: arr
        }
      })

      res.send('saccfully!!!!!!!!!!!!!!!')
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = { Product }
