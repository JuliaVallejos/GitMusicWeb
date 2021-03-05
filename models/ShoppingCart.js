const mongoose = require ('mongoose')

const cartSchema = new mongoose.Schema({
  idProduct:{type: mongoose.Schema.ObjectId, ref: "product"},
  quantity:{type:Number,required:false}
})

const ShoppingCartSchema = new mongoose.Schema({
  idUser:{type: mongoose.Schema.ObjectId, ref: 'user',required: true},
  arrayProducts:[cartSchema],
})

const ShoppingCart = mongoose.model('shoppingcart',ShoppingCartSchema)

module.exports = ShoppingCart