const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')
const validator = require('../controllers/validator')
const userController=require('../controllers/userController')
const productController = require('../controllers/productController')
const { deleteProduct } = require('../controllers/productController')

//rutas
//user

router.route('/user/signup')
.post(userController.newUser)
router.route('/user/login')
.post(userController.logIn)
router.route('/user/test')
.get(userController.test)

//shooping

//product
router.route('/products')
.get(productController.allProducts)
.post(productController.addProduct)

router.route('/products/:idProduct')
.delete(productController.deleteProduct)

module.exports = router