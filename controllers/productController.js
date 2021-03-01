const Product = require('../models/Product')

const productController = {
  test:(req,res)=>{
    console.log(req.body)
    const {id}=req.body
    res.json({success:true,response:"Estoy en linea "+id})
  }

}
module.exports = productController