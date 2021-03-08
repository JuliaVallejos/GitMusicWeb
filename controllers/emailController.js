require('dotenv').config()
var nodemailer = require('nodemailer')
const User = require('../models/User')
const bcryptjs=require("bcryptjs")
const emailController = {

   sendEmailCart: async (req, res) =>{

       const {email,dataCart} =req.body
     
       const {userData,shoppingCart} = dataCart
       console.log(userData)
       console.log(shoppingCart)
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
            from: 'Git Music" <gitmusic.team@gmail.com>',
            to: email,
            subject:"¡Bienvenido a GitMusic! Gracias por su compra",
            html: `<div style="text-align:center;padding:20px; min-heigth: 250px; background-color:#11050F">
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
},
    requestResetPass: async (req,res) =>{
       
        function random() {
        return Math.random().toString(36).substr(2);
    };
    function token() {
        return random() + random(); 
    };
        const {email}=req.body
     
        const userExist= await User.findOne({'email':email})
        if(!userExist){
        res.json({success:false, response:"Este correo no pertenece a un usuario registrado"})
        }else{
            if(userExist.accountGoogle){
                res.json({success:false, response:"Este correo está registrado con Google, no puede reestablecer contraseña"})
            }else{
        var tokenResetPassword = token()
        const act=await User.findOneAndUpdate(
            {_id:userExist._id},
            {'$set':{'tokenResetPassword':tokenResetPassword,'requestResetPassword':1}},{new: true}
        )
        //Envio de mensaje
        var to=`${userExist.email}`
        var subject= "Restablecimiento de contraseña"
        var message= `<p>Para Restablecer la <span>contraseña</span>, ingresa al siguiente link.</p>
        <a href='http://localhost:3000/resetpassword/${tokenResetPassword}'>Restablecer la contraseña</a>
        <p class="firma">Tienda de instrumentos<br>Git Music Team</p>
       
        ` 
        const html=`
        <html lang="es">
        <head>
            <style>
            .contenedor,.cabecera,.footer{
                width: 100%;
            }
            .cabecera{
                background-color: rgb(12, 12, 12);
                font-weight: bold;
            }
            
            .footer{
                background-color: rgba(6, 134, 200, 0.863) ;
                font-weight: bold;
            }
            .cuerpo{
                background-color: rgb(250, 250, 250);
                padding: 2vw;
            } 
            .cuerpo span{
                font-weight:bold;
            }
            .cuerpo p{
                font-size:2vw
            }
            .cabecera h1,.footer h2{
                color:rgb(250, 250, 250);
                text-align:center;
                padding: 1.5vh 0
            }
            .cabecera h1{
                font-size:2.5vw
            }
            .cabecera{
                display:flex;
                justify-content:space-around;
                align-items:center
            }
            .cajaLogo{
                min-width:8vw;
                min-height:8vw;
                padding:1vw;
                border-radius:2vw
            }
            .logoPic{
                background-image:url("https://i.ibb.co/hy5jcgy/gitLogo.png"); 
                background-repeat:no-repeat;
                background-position:center;
                background-size:cover;
                width:100%;
                height:100%;
             
            }
            .footer h2{
                font-size:1.5vw
            }
            .firma{
                text-align:right
            }
            </style>
        </head>
        <body>
        <section class="contenedor">
            <div class="cabecera">
                <div class="cajaLogo"><div class="logoPic"></div></div>
                <div><h1>Git Music</h1></div>
            </div>
        <div class="cuerpo">${message}</div>
        <div class="footer">
            <h2>¡Gracias por elegirnos!</h2>
        </div>
        </section>
        </body>
        </html>`
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", 
        port: 587,
        secure: false,
        auth: {
            user:process.env.MAIL_USER, 
            pass:process.env.MAIL_PASS, 
        },
        });
        await transporter.sendMail({
        from: '"Git Music" <gitmusic.team@gmail.com>',
        to:to,
        subject:subject, 
        html:html, 
        },(error, info) => {
        if (error) {
            return res.json({success:false, response: 'Ha ocurrido un error en el envio del mensaje'})
        }else{
            return res.json({success:true, response: 'Revise su casilla de correo para restablecer la contraseña'})
        }
        })
        }}
    },
    validateResetPassword:async(req,res)=>{
        const {tokenResetPassword,password}=req.body
        const userExist=await User.findOne({'tokenResetPassword':tokenResetPassword,'requestResetPassword':1})
        if(!userExist){
        res.json({success:false, response:"Este usuario no pidio un cambio de contraseña."})
        }else{
        const hashedPassword = bcryptjs.hashSync(password, 10)
        await User.findOneAndUpdate(
            {_id:userExist._id},
            {'$set':{'password':hashedPassword,'tokenResetPassword':'','requestResetPassword':0}}
        )
        res.json({success:true,response:"Se ha cambiado la contraseña correctamente."})
        }
    },
    validateResetUser:async(req,res)=>{
        const {token}=req.body
        const userExist= await User.findOne({'tokenResetPassword':token,'requestResetPassword':1})
        if(!userExist){
        res.json({success:false})
        }else{
        res.json({success:true})
        }
    }


}
module.exports = emailController