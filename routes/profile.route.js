const router = require('express').Router();
const bodyParser = require('body-parser');
const check=require('express-validator').check

const profileController=require('../controllers/profile.controller')
const authGuard=require('./guards/auth.guard')


router.get('/',authGuard.isAuth,profileController.getProfile)
router.get('/:id',authGuard.isAuth,profileController.getProfile)

module.exports = router