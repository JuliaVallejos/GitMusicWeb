const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const userController = {
  test:(req,res)=>{
    console.log(req.body)
    const {id}=req.body
    res.json({success:true,response:"Estoy en linea "+id})
  }

}
module.exports = userController