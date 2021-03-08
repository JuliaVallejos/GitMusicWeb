require('dotenv').config()
var nodemailer = require('nodemailer')
const User = require('../models/User')
const bcrypt=require("bcryptjs")
const emailController = {

   sendEmailCart: async (req, res) =>{

       const {email,dataCart} =req.body
       console.log(dataCart)
       console.log(email)
    try{
        const userAwait = await User.findOne({email:email})
        if(!userAwait){ 
        
            res.json({success: false, errors:[{message:"User don't exist"}]})
        }
        else{    
       
        var transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USER,//gitmusic.team@gmail.com
                pass: process.env.MAIL_PASS //gitmusic2021
               
            },
            tls: {
                  rejectedUnauthorized:false
                } 
        })
        
                
        var mailOptions = {
            from: 'gitmusic.team@gmail.com <don`t reply>',
            to: email,
            subject:"¡Bienvenido a GitMusic! Gracias por su compra",
            html: `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:#11050F">
                        <h1 style="color:#0687c8">Estos son los datos de su compra</h1>  
                    </div>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error)
                res.status(500).send(error.message)
            }else {
                console.log("Email enviado.")
                res.status(200).json({respuesta:req.body})
            }
        })} 
    
      
    }catch(error){
        console.log('error')
        console.log(error)
        res.json({success:false,error})
    }
}}
module.exports = emailController