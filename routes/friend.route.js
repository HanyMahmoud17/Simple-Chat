const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({extended:true})
const check=require('express-validator').check

const friendController=require('../controllers/friend.controller')
const authGuard=require('./guards/auth.guard')


// router.post('/add',authGuard.isAuth,bodyParser,friendController.add)
router.post('/cancel',authGuard.isAuth,bodyParser,friendController.cancel)
router.post('/accept',authGuard.isAuth,bodyParser,friendController.accept)
router.post('/reject',authGuard.isAuth,bodyParser,friendController.reject)
router.post('/dalete',authGuard.isAuth,bodyParser,friendController.delete)

module.exports = router