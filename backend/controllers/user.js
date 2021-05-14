const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const {registerValidation, loginValidation, editValidation} = require('../middlewares/validation')
const Club = require('../models/Club')
const Argument = require('../models/Argument')

//@desc create a user
//@router POST /api/v1/user/register
//@access public


exports.createUser = asyncHandler(async(req, res, next) => { 
 
   //register validation 
   const {error} = registerValidation(req.body)
   if(error) return res.status(400).json({success: false, message: error.details[0].message})

   //hash password 
   const salt = await bcrypt.genSalt(10)
   req.body.password = await bcrypt.hash(req.body.password, salt)

   //create new user 
   try{
      const user = await User.create(req.body)
      const token = jwt.sign({_id: user.id}, process.env.SECRET_TOKEN)
      res.header('auth-token', token).send(token)
      res.status(200).json({success: true, data: user})
   }catch(err){
      if(err.code == 11000) res.status(400).json({success: false, message:'Username or email are duplicates'})
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
   const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)
   res.header('auth-token', token).send(token)
})

//@desc edit a user
//@rotuer PUT /api/v1/user/edit
//@access private

exports.editUser = asyncHandler(async(req,res,next) => {


   const user = await User.find({username: req.user.username})

   if(!req.body.username) req.body.username = user[0].username
   if(!req.body.email) req.body.email = user[0].email
   if(!req.body.password) req.body.password = user[0].password
   else {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)}

   const {error} = editValidation(req.body)

   if(error) return res.status(400).send(error.details[0].message)

   

   
   try{
      const newUser = await User.findByIdAndUpdate(user[0]._id, req.body)
      res.status(200).json({success: true, message: 'User modified succesfully'})
   }catch(err){
      if(err.code == 11000) res.status(400).json({success: false, message:'Username or email are duplicates'})
   }

})

//@desc delete a user
//@router DELETE /api/v1/user/delete
//@access private

exports.deleteUser = asyncHandler(async(req,res,next) => {
   try{
   
   
   await User.findByIdAndDelete(req.user._id, async () => {



      const totalArgs = await Argument.find()
      const totalClubs = await Club.find()
   
      totalArgs.forEach(async (arg, index) => {
         console.log(arg)
         if(arg.creator == req.user.username){
            await Argument.findByIdAndDelete(arg._id)
         }
      })
   
      totalClubs.forEach(async (club, index) => {
         console.log(club)
         if(club.creator == req.user.username){
            await Club.findByIdAndDelete(club._id)
         }
      })


   })
   res.status(200).json({success: true, message:'You deleted your account with success'})
   }catch(err){
      res.status(400).json({success: false, message: 'Something went wrong'})
   }
})

//@desc search for a user
//@path GET api/v1/user/:username
//@access public

exports.getUser = asyncHandler(async (req, res) => {
   const user = await User.find({username: req.params.username})

   if(user) return res.status(200).json({success: true, message: user})
   else return res.status(400).json({success: false, message:'There is no user with that username'})
})