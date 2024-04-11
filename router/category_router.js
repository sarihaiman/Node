const express=require('express')
const CategoryControllet =require('../controllers/categoryController');
const router=express.Router();

router.get('/category',CategoryControllet.getPro)
router.get('/:category/:id',CategoryControllet.getProId)
router.post('/category',CategoryControllet.postPro)
router.delete('/category/:id',CategoryControllet.deletePro)
router.put('/category',CategoryControllet.putPro)

module.exports=router