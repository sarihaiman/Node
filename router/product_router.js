const express=require('express')
const ProductControllet =require('../controllers/productsController');
const router=express.Router();

router.get('/product/:category',ProductControllet.getproduct)
router.get('/product/:category/:id',ProductControllet.getProductById)
router.post('/product/:category',ProductControllet.postProductasync)
router.delete('/product/:category/:id',ProductControllet.deleteProduct)
router.put('/product/:category',ProductControllet.putProduct)

module.exports=router