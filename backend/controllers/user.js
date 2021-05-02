const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const {registerValidation, loginValidation, editValidation} = require('../middlewares/validation')

//@desc create a user
//@router POST /api/v1/user/register
//@access public


exports.createUser = asyncHandler(async(req, res, next) => { 

   //register validation 
   const {error} = registerValidation(req.body)
   if(error) res.status(400).json({success: false, message: error.details[0].message})

   //hash password 
   const salt = await bcrypt.genSalt(10)
   req.body.password = await bcrypt.hash(req.body.password, salt)

   //create new user 
   try{
      const user = await User.create(req.body)
      res.status(200).json({success: true, data: user})
   }catch(err){
      if(err.code == 1100) res.status(400).json({success: false, message:'Username or email are duplicates'})
   }
})

//@desc login as a user
//@router POST /api/v1/user/login
//@access public 

exports.loginUser = asyncHandler(async(req,res,next) => {
   const {error} = loginValidation(req.body)
   if(error) return res.status(400).send(error.details[0].message)

   //check if there is a username like the one inserted
   const user = await User.findOne({username: req.body.username})
   if(!user) return res.status(400).send('Username or password wrong')

   //password correct
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if(!validPass) return res.status(400).json('Username or password wrong')

   //create and assign token
   const token = jwt.sign({_id: user.id}, process.env.SECRET_TOKEN)
   res.header('auth-token', token).send(token)
})

//@desc edit a user
//@rotuer PUT /api/v1/user/edit
//@access private

exports.editUser = asyncHandler(async(req,res,next) => {
   const {error} = editValidation(req.body)
   if(error) return res.status(400).send(error.details[0].message)
})

