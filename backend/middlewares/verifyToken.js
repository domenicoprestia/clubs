const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async function(req,res,next){
   const token = req.header('auth-token')
   if(!token) return res.status(401).json({success: false, message: 'You are not authenticated'})

   try{
      const verified = jwt.verify(token, process.env.SECRET_TOKEN)
      req.user = await User.findById(verified._id)
      if(req.user.username) next()
      else res.status(400).send({succcess: false, message: 'authenticating with invalid token'})
   }catch(err){
      res.status(400).send({succcess: false, message: 'authenticating with invalid token'})
   }
}