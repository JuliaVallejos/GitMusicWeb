const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')
const validator = require('../controllers/validator')
const userController=require('../controllers/userController')
const productController = require('../controllers/productController')
const shoopingCartController = require('../controllers/shoopingCartController')

//rutas
//user
router.route('/user/signup')
.post(userController.newUser)

router.route('/user/login')
.post(userController.logIn)

router.route('/user/ls')
.post(passport.authenticate('jwt', { session: false }), userController.logFromLS)

//product
router.route('/products')
.get(productController.allProducts)
.post(productController.addProduct)
router.route('/products/:idProduct')
.delete(productController.deleteProduct)

router.route('/products/newrating')
.put(productController.addRating)

router.route('/products/newcomment')
.put(productController.addComment)

router.route('/products/editcomment')
.put(productController.editComment)

router.route('/products/delcomment')
.put(productController.delComment)

//shooping
router.route('/products/shoopingcart')
.get(shoopingCartController.getShoopingCart)
.post(shoopingCartController.addShoopingCart)

router.route('/products/editshoopingcart')
.put(shoopingCartController.editShoopingCart)

module.exports = router