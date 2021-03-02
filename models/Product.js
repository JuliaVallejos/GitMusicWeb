const mongoose = require ('mongoose')

const ratingSchema = new mongoose.Schema({
  idUser:{type: mongoose.Schema.ObjectId, ref: 'user',required: true},
  value:{type: Number, required:true}
})
const commentSchema = new mongoose.Schema({
  idUser:{type: mongoose.Schema.ObjectId, ref: 'user',required: true},
  comment:{type: String, required:true}
})

const ProductSchema = new mongoose.Schema({
  name:{type:String, required:true},
  category:{type:String, required:true},
  type:{type: String, required:true},
  mark:{type: String, required:false},
  price:{type: Number, required:true},
  stock:{type: Number, required:true},
  warranty:{type: Number, required:false, default:1},
  urlReview:{type: String, required:false},
  arrayPic:[String],
  arrayRating:[ratingSchema],
  arrayComments:[commentSchema],
  arrayDescription:[String],
  arrayVisits:[String],
  outstanding:{type: Boolean,default:false}
})

const Product = mongoose.model('product',ProductSchema)

module.exports = Product