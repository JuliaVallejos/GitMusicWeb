const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const path = require('path')

const userController = {
  newUser: async(req, res) => {
    try {
      const { firstName, lastName, email, password, pic, rol, google} = req.body
      console.log(google)
      const userExists = await User.findOne({ email: email})//buscamos coincidencia
      if (userExists) {
        let error = [{ path: ['useremailExist'] }] //si el email ya existe
        res.json({ success: false, error: error }) //retorna este error.
      }
      const hashedPassword = bcryptjs.hashSync(password, 10) //encriptamos password
      var newUser = new User({
        firstName, lastName, email, password: hashedPassword, pic, rol
          })
      if(google !== 'true'){
        const {fileUrlPic}=req.files
        if(fileUrlPic.mimetype.indexOf('image/jpg')!==0&&fileUrlPic.mimetype.indexOf('image/jpeg')!==0&&fileUrlPic.mimetype.indexOf('image/png')!==0&&fileUrlPic.mimetype.indexOf('image/bmp')!==0){
           return res.json({success:false,error:"El formato de la imagen tiene que ser JPG,JPEG,BMP ó PNG."})
        }
        const extPic=fileUrlPic.name.split('.',2)[1]
        ///../client/build/usersPics/
        console.log(__dirname)
        fileUrlPic.mv(`${__dirname}/../frontend/public/assets/userPics/${newUser._id}.${extPic}`,error =>{
           if(error){
              return res.json({success:false,error:"Intente nuevamente..."})
           }
        })
        newUser.pic=`./assets/userPics/${newUser._id}.${extPic}`
     }else{
      console.log("google")
      newUser.pic=pic
     }
      var newUserSaved = await newUser.save() //intentamos guardar en la db
      console.log(newUserSaved)
      var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {}) 
        return res.status(200).send({
          success: true,
          response: {
            token,
            firstName: newUserSaved.firstName,
            email: newUserSaved.email,
            pic: newUserSaved.pic,
            userId: newUserSaved._id
          }
        })
    } catch (error) {
        res.status(500).send({ success: false, error })
    }
},

logIn: async (req, res) => {
  try {
      const { email, password } = req.body
      const userExists = await User.findOne({ email: email })
      if (!userExists) {
          return res.json({ success: false, error: 'Incorrect email and / or password.' })//si el email no coincide
      }
      const passwordMatches = bcryptjs.compareSync(password, userExists.password)//si la password no coincide
      if (!passwordMatches) {
          return res.json({ success: false, error: 'Incorrect email and / or password.' })
      }
      var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
      return res.json(
          {
              success: true, response: {
                  token,
                  firstName: userExists.firstName,
                  email: userExists.email,
                  userId: userExists._id,
                  pic:userExists.pic
              }
          })//al confirmar assets para form agregar pic
  } catch (error) {
      res.json({ success: false, error })
  }
},

modifyUser: (req, res) => {
  const {id, email, firstName, lastName} = req.body
  const {pic} = req.files
  const picUser = image.name.split('.')
  const url = `../assets/${id}.${picUser[1]}`
  image.mv(`./frontend/public/assets/${id}.${pic[1]}`, errores=> {
  if(errores) {
      return res.json({
          success: false,
          errores:errores,
          mensaje:'No se puede actualizar. Intente mas tarde'
      })
  }
  })
  User.findOneAndUpdate({_id: id},
  {$set: {firstName, email, lastName, pic: url}},
  {new: true})
  .then(data => res.json({ success: true, response: data }))
  .catch(error => res.json({ success: false, error }))
},

logFromLS: (req, res) => {
  console.log(req.body, req.user)
  try {
    res.json({
      success: true, response: {
        token: req.body.token,
        firstName: req.user.firstName,
        pic: req.user.pic,
        email: req.user.email,
        userId: req.user._id
        }
      })
  } catch (error) {
      res.json({ success: false, error })
  }
}
}

module.exports = userController