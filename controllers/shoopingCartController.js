const ShoopingCart = require('../models/ShoopingCart')

const shoopingController = {
  test:(req,res)=>{
    console.log(req.body)
    const {id}=req.body
    res.json({success:true,response:"Estoy en linea "+id})
  }

}
module.exports = shoopingController