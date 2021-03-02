const ShoopingCart = require('../models/ShoopingCart')

const shoopingCartController = {
  addShoopingCart: async (req,res) =>{
    const {idUser,arrayProducts} = req.body
    const newShooping = new ShoopingCart({idUser,arrayProducts})
    try{
      const cartShooping = await newShooping.save()
      if(cartShooping){
        res.json({success:true, response: cartShooping})
      }else{
        res.json({success:false,response:'Error in save'})
      }
    }catch(error){  
      res.json({success:false,error})} 
  },
  editShoopingCart:async(req,res)=>{
    const {idUser,arrayProducts}=req.body
    try {
      const shoopingExists=await ShoopingCart.findOne({idUser:idUser})
      if(shoopingExists){
        try {
          const editShooping=await ShoopingCart.updateOne(
            {'_id':shoopingExists._id},
            { '$set': {'arrayProducts':arrayProducts}},{new:true})
          if(editShooping){
            res.json({success:true, response:editShooping})
          }else{
            res.json({success:false, error:"Error while modifying in database."})
          }
        } catch (error) {
          res.json({success:false,error})} 
        }else{
          res.json({success:false, error:"Not found Shooping cart for this user."})
        }
    } catch (error) {
      res.json({success:false,error})} 
  },
  getShoopingCart:async(req,res)=>{
    const {idUser}=req.body
    try {
      const shoopingCartUser=await ShoopingCart.findOne({idUser:idUser})
      if(shoopingCartUser){
        res.json({success:true, response: shoopingCartUser})
      }else{
        res.json({success:false, error:"Not found Shooping cart for this user."})
      }
    } catch (error) {
      res.json({success:false,error})} 
  }
}
module.exports = shoopingCartController