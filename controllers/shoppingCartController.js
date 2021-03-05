const ShoppingCart = require('../models/ShoppingCart')
const Product = require('../models/Product')

const shoppingCartController = {
  shoppingCart:async(req,res)=>{
    const {idUser,arrayProducts}=req.body
    async function subtractStock(arrayProducts) {
      try {
        arrayProducts.map(async(product)=>{
          const productSearch = await Product.findOne({_id:product.idProduct})
          if(productSearch){
            const subtract=productSearch.stock-product.quantity
            const subtractProduct=await Product.findOneAndUpdate(
              {_id:product.idProduct},{stock:subtract})
          }
        })
      } catch (error) {
      }
    }
    try {
      const shoppingExists=await ShoppingCart.findOne({idUser:idUser})
      if(shoppingExists){
        try {
          const editShopping=await ShoppingCart.updateOne(
            {'_id':shoppingExists._id},
            { '$set': {'arrayProducts':arrayProducts}},{new:true})
          if(editShopping){
            subtractStock(arrayProducts)
            res.json({success:true, response:editShopping})
          }else{
            res.json({success:false, error:"Error while modifying in database."})
          }
        } catch (error) {
          res.json({success:false,error})} 
        }else{
          const newShopping = new ShoppingCart({idUser,arrayProducts})
          try{
            const cartShopping = await newShopping.save()
            if(cartShopping){
              subtractStock(arrayProducts)
              res.json({success:true, response: cartShopping})
            }else{
              res.json({success:false,response:'Error in save'})
            }
          }catch(error){  
            res.json({success:false,error})} 
        }
    } catch (error) {
      res.json({success:false,error})} 
  },
  getShoppingCart:async(req,res)=>{
    const {idUser}=req.body
    try {
      const shoppingCartUser=await ShoppingCart.findOne({idUser:idUser})
      .populate('idUser')
      .populate('arrayProducts.idProduct')
      if(shoppingCartUser){
        res.json({success:true, response: shoppingCartUser})
      }else{
        res.json({success:false, error:"Not found Shopping cart for this user."})
      }
    } catch (error) {
      res.json({success:false,error})} 
  }
}
module.exports = shoppingCartController