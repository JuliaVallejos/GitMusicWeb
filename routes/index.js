const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')
const validator = require('../controllers/validator')
const userController=require('../controllers/userController')

//rutas
//user

router.route('/user/signup')
.post(userController.newUser)
router.route('/user/login')
.post(userController.logIn)
router.route('/user/ls')
.post(passport.authenticate('jwt', { session: false }), userController.logFromLS)
router.route('/user/test')
.get(userController.test)

//shooping

//product
module.exports = router