const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const path = require('path')

const userController = {
  newUser: async(req, res) => {
    console.log("entre al controlador")
      console.log(req.body, req.files)
    try {
      const errores = []
      const { firstName, lastName, email, password, country, rol } = req.body
      // const file = req.files.file //pic que viaja por la action
      const userExists = await User.findOne({ email: email})//buscamos coincidencia
      if (userExists) {
        let error = [{ path: ['useremailExist'] }] //si el email ya existe
        res.json({ success: false, errores: error }) //retorna este error.
      }
      // file.mv(path.join(__dirname, `../client/build/assets/profilePictures/${file.md5}.jpg`), error => {
      //     if (error) {
      //         return res.json({ response: error })
      //     }
      // }
      // ) en caso de que defina las rutas de la pic añadir a newUser
      if (errores.length === 0) { // si no hay errores en nuestra variable errores.
        const hashedPassword = bcryptjs.hashSync(password, 10) //encriptamos password
        // const profilePictureUbicacion = `/assets/profilePictures/${file.md5}.jpg`
        var newUser = new User({
          firstName, lastName, email, password: hashedPassword, country, rol
            })
            var newUserSaved = await newUser.save() //intentamos guardar en la db
            var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {}) //tokeamos el user
        }
        return res.json({
          success: errores.length === 0 ? true : false,
          response: {
            token,
            firstName: newUserSaved.firstName,
            email: newUserSaved.email,
            userId: newUserSaved._id
          }
        })
    } catch (error) {
        res.json({ success: false, error })
        console.log(error)
    }
},

logIn: async (req, res) => {
  try {
      const { email, password } = req.body
      const userExists = await User.findOne({ email: email })
      if (!userExists) {
          return res.json({ success: false, message: 'Incorrect email and / or password.' })//si el email no coincide
      }
      const passwordMatches = bcryptjs.compareSync(password, userExists.password)//si la password no coincide
      if (!passwordMatches) {
          return res.json({ success: false, message: 'Incorrect email and / or password.' })
      }
      var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
      return res.json(
          {
              success: true, response: {
                  token,
                  firstName: userExists.firstName,
                  email: userExists.email,
                  userId: userExists._id
              }
          })//al confirmar assets para form agregar pic
  } catch (error) {
      res.json({ success: false, error })
      console.log(error)
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