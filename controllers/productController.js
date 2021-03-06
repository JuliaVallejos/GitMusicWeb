const Product = require('../models/Product')
const imgbbUploader = require("imgbb-uploader");

const productController = {
  //obtener todos los productos//
  allProducts: async (req, res)=>{
    try{
        const response= await Product.find().populate('arrayComments.idUser')
        if(response) {
            return res.json({success: true, response})
     } 
    }catch(error){
        return res.json({success: false, error})
    }
},
addProduct: async (req,res) =>{
  const {name,category,type,mark,price,stock,warranty,urlReview,arrayRating,arrayComments,arrayDescription,arrayVisits,outstanding} = req.body
  var {arrayPics}=req.files
  const newProduct = new Product({name,category,type,mark,price,stock,warranty,urlReview,arrayPic:[],arrayRating,arrayComments,arrayDescription,arrayVisits,outstanding})
  if(arrayPics.name){
    arrayPics=[arrayPics]
  }
  try{
    arrayPics.map(async(pic,i) =>{
      if(pic.mimetype.indexOf('image/jpg')!==0&&pic.mimetype.indexOf('image/jpeg')!==0&&pic.mimetype.indexOf('image/png')!==0&&pic.mimetype.indexOf('image/bmp')!==0)
      {
          return res.json({success:false,error:"El formato de la imagen tiene que ser JPG,JPEG,BMP ó PNG."})
      }
      const extPic=pic.name.split('.',2)[1]
      const pathLocal=`${__dirname}/../client/build/productPics/${pic.md5}.${extPic}`
      pic.mv(`${__dirname}/../client/build/productPics/${pic.md5}.${extPic}`,error =>{
        if(error){
          return res.json({success:false,error:"Intente nuevamente..."})
        }
      })
      try {
        const response= await imgbbUploader(process.env.IMGBB_KEY,pathLocal,)
        urlPhoto=response.url
        if(response){
            var savePhoto=await newProduct.arrayPic.push(urlPhoto)
            if(savePhoto&&newProduct.arrayPic.length===arrayPics.length){
              try {
                const addedProduct = await newProduct.save()
                if(addedProduct){
                  return res.json({success:true, response: addedProduct})
                }else{
                  return res.json({success:false,response:'Error in save'})
                } 
              } catch (error) {
                return res.json({success:false, error:"Erro: "+error})
              }}
          }
      } catch (error) {
          return res.json({success:false, error:"Error al subir la foto al servidor: "+error})
      }
    })
  }catch(error){ 
      return res.json({success:false,error:"catch :"+error})
  } 
  },
  //agregar producto//
  addProductAdmin: async (req,res) =>{
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
  addRating:async(req,res) =>{
    const {idProduct,idUser,value,edit}=req.body.ratingObject
    try {
      if(edit){
        const editRating=await Product.findOneAndUpdate(
          {_id:idProduct,'arrayRating.idUser':idUser},
          { '$set': {'arrayRating.$.value':value}},{new:true}).populate('arrayComments.idUser')
          if(editRating){
            res.json({success:true, response:editRating})
          }else{
            res.json({success:false, error:"Error while modifying in database."})
          }
      }else{
        const addRating=await Product.findOneAndUpdate(
          {_id:idProduct},
          { $push: {'arrayRating': {idUser:idUser,value:value}}},{new:true})
        if(addRating){
          res.json({success:true, response:addRating})
        }else{
          res.json({success:false, error:"Error while modifying in database."})
        }
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
        { $push: {'arrayComments': {idUser:idUser,comment:comment}}},{new:true}).populate('arrayComments.idUser')
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
        { $pull: {'arrayComments': {_id:idComment}}},{new:true}).populate('arrayComments.idUser')
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
      const editComment=await Product.findOneAndUpdate(
        {'arrayComments._id':idComment},
        { '$set': {'arrayComments.$.comment':comment}},{new:true}).populate('arrayComments.idUser')
      if(editComment){
        res.json({success:true, response:editComment})
      }else{
        res.json({success:false, error:"Error while modifying in database."})
      }
    } catch (error) {
      res.json({success: false,error})
    }
  },
  getProductDetail:async(req,res)=>{
    const {idProduct}=req.params
    try {
      const getProductById=await Product.findOne({_id:idProduct}).populate('arrayComments.idUser')
      if(getProductById){
        res.json({success:true,response:getProductById})
      }else{
        res.json({success:false,error:"This product don't exist"})
      }
    } catch (error) {
      res.json({success: false,error})
    }
  }
}
module.exports = productController