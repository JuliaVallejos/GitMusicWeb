const mongoose = require ('mongoose')

const cartSchema = new mongoose.Schema({
  idProduct:{type: mongoose.Schema.ObjectId, ref: "product"},
  quantity:{type:Number,required:false}
})

const ShoopingCartSchema = new mongoose.Schema({
  idUser:{type: mongoose.Schema.ObjectId, ref: 'user',required: true},
  arrayProducts:[cartSchema],
})

const ShoopingCart = mongoose.model('shoopingcart',ShoopingCartSchema)

module.exports = ShoopingCart