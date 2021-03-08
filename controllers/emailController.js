require('dotenv').config()
var nodemailer = require('nodemailer')
const User = require('../models/User')
const bcrypt=require("bcryptjs")
const emailController = {

   sendEmailCart: async (req, res) =>{

       const {email,dataCart} =req.body
       console.log(req.body.dataCart)
       console.log(req.body.dataCart.userData)

       const userAwait = await User.findOne({email:email})
        if(!userAwait){ 
            res.json({success: false, errors:[{message:"User don't exist"}]})
        }
        else{     
        var transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
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
                        <h1 style="color:#FFB5FF">Estos son los datos de su compra</h1>
                       
                    </div>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                res.status(500).send(error.message)
            }else {
                console.log("Email enviado.")
                res.status(200).json({respuesta:req.body})
            }
        })} 
     */
    }
}
module.exports = emailController