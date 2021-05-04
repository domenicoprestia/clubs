const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username: {
      type: String, 
      required: [true, "Please insert an username"],
      min: 6, 
      max: 18,
      unique: true
   },
   email:{
      type: String, 
      required: [true, 'Please insert an email'],
      max: 255,
      unique: true
   },
   password:{
      type: String, 
      required: [true, "Please insert a password"],
      max: 1024,
      min: 6 
   },
   image: {
      type: String, 
   },
   clubs:{
      type: Array,
   },
   approvedClubs:{
      type: Array
   },
   approvedArguments:{
      type: Array
   }
})

module.exports = mongoose.model('User', UserSchema)