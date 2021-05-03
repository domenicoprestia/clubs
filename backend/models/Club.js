const { string } = require('joi');
const mongoose = require('mongoose');
const Argument = require('./Argument')

const ClubSchema = mongoose.Schema({
   clubName:{
      name: {
         type: String,
         required: [true, "Please add a club name"],
         min: 6,
         max: 30,
         unique: true
      },
      topic: {
         type: String, 
         required: [true, "Please add a topic"]
      },
      question: {
         type: String,
         required: [true, "Please add a question"],
         min: 6,
         max: 255 
      },
      image: {
         type: String, 
      },
      arguments: {
         type: Argument 
      }
   }
})

module.exports = mongoose.model('Club', ClubSchema)