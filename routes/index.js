const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')
const validator = require('../controllers/validator')
const userController=require('../controllers/userController')
const productController = require('../controllers/productController')
const shoppingCartController = require('../controllers/shoppingCartController')

//rutas
//user
router.route('/user/signup')
.post(validator.validNewUser,userController.newUser)

router.route('/user/login')
.post(userController.logIn)

router.route('/user/ls')
.post(passport.authenticate('jwt', { session: false }), userController.logFromLS)

router.route('/userDetails')
.post(userController.modifyUser)

// router.route('/user/test')
// .get(userController.test)

//shooping

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
router.route('/products/shoppingcart')
.get(shoppingCartController.getShoppingCart)
.post(shoppingCartController.addShoppingCart)

router.route('/products/editshoppingcart')
.put(shoppingCartController.editShoppingCart)

module.exports = router