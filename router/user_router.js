const express=require('express')
const UserControllet =require('../controllers/usersController');
const router=express.Router();

router.post('/login',UserControllet.login)
router.post('/signup',UserControllet.signUp)

module.exports=router