const Product = require('../models/Product')

const productController = {
  //obtener todos los productos//
  allProducts: async (req, res)=>{
    try{
        const response= await Product.find().populate('arrayComments.idUser').populate('arrayRating.idUser')
        if(response) {
            return res.json({success: true, response})
     } 
    }catch(error){
        return res.json({success: false, error})
    }
},

  //agregar producto//
  addProduct: async (req,res) =>{
    const {name,category,type,mark,price,stock,warranty,urlReview,arrayPic,arrayRating,arrayComments,arrayDescription,arrayVisits,outstanding} = req.body
    const newProduct = new Product({name,category,type,mark,price,stock,warranty,urlReview,arrayPic,arrayRating,arrayComments,arrayDescription,arrayVisits,outstanding})
    try{
      const addedProduct = await newProduct.save()
      if(addedProduct){
        res.json({success:true, response: addedProduct})
      }else{
        res.json({success:false,response:'Error in save'})
      }
    }catch(error){  
      res.json({success:false,error})} 
  },
  // borrar producto //
  deleteProduct:async (req,res) =>{
    const id= req.params.idProduct
    try{
      const removed= await Product.findOneAndRemove({_id:id})
      if(removed){
        res.json({success: true, response: "Product removed",product:removed})
      }else{
        res.json({success: false, error: "This product don't exist"})
      }
    }catch(error){
      res.json({success: false,error})
    }
  },
  addRating:async (req,res) =>{
    const {idProduct,idUser,value}=req.body
    try {
      const addRating=await Product.findOneAndUpdate(
        {_id:idProduct},
        { $push: {'arrayRating': {idUser:idUser,value:value}}},{new:true})
      if(addRating){
        res.json({success:true, response:addRating})
      }else{
        res.json({success:false, error:"Error while modifying in database."})
      }
      } catch (error) {
      res.json({success: false,error})
    }
  },
  addComment:async (req,res) =>{
    const {idProduct,idUser,comment}=req.body
    try {
      const addComment=await Product.findOneAndUpdate(
        {_id:idProduct},
        { $push: {'arrayComments': {idUser:idUser,comment:comment}}},{new:true})
      if(addComment){
        res.json({success:true, response:addComment})
      }else{
        res.json({success:false, error:"Error while modifying in database."})
      }
    } catch (error) {
      res.json({success: false,error})
    }
  },
  delComment:async(req,res)=>{
    const {idProduct,idComment}=req.body
    try {
      const delComment=await Product.findOneAndUpdate(
        {_id:idProduct},
        { $pull: {'arrayComments': {_id:idComment}}},{new:true})
      if(delComment){
        res.json({success:true, response:delComment})
      }else{
        res.json({success:false, error:"Error while modifying in database."})
      }
    } catch (error) {
      res.json({success: false,error})
    }
  },
  editComment:async(req,res)=>{
    const {idComment,comment}=req.body
    try {
      const editComment=await Product.updateOne(
        {'arrayComments._id':idComment},
        { '$set': {'arrayComments.$.comment':comment}},{new:true})
      if(editComment){
        res.json({success:true, response:editComment})
      }else{
        res.json({success:false, error:"Error while modifying in database."})
      }
    } catch (error) {
      res.json({success: false,error})
    }
  }
}
module.exports = productController