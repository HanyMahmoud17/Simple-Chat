const router = require('express').Router();
const bodyParser = require('body-parser');
const check=require('express-validator').check

const homeController=require('../controllers/home.controller')
const authGuard=require('./guards/auth.guard')

router.get('/',authGuard.isAuth,homeController.getHome)


module.exports=router