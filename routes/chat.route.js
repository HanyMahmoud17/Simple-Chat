const router = require('express').Router();


const chatController=require('../controllers/chat.controller')
const authGuard=require('./guards/auth.guard')

router.get('/:id',authGuard.isAuth,chatController.getChat)


module.exports=router