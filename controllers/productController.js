const Product = require('../models/Product')

const productController = {
  test:(req,res)=>{
    console.log(req.body)
    const {id}=req.body
    res.json({success:true,response:"Estoy en linea "+id})
  },
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
          res.json({success: true, message: "Product removed",product:removed})
        }else{
          res.json({success: false, message: "This product don't exist"})
        }
      }catch(error){
        res.json({success: false,error})

  }

}
}
module.exports = productController