const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
  firtsName:{type:String, required:true},
  lastName:{type:String, required:true},
  email:{type: String, required:true},
  country:{type: String, required:false},
  rol:{type: String, required:false, default:"user"},
  pic:{type: String, required:false, default:'../assets/img/logoUser.png'},
  password:{type: String , required: true},
  accountGoogle:{type: Boolean,default:false},
  idShopCart:{type: mongoose.Schema.ObjectId, ref: 'shoppingCart',required: false},
})

const User = mongoose.model('user',UserSchema)

module.exports = User