const mongoose = require('mongoose');
const ArgumentSchema = require('./Argument')

const ClubSchema = mongoose.Schema({
   clubName:{
      name: {
         type: String,
         required: [true, "Please add a club name"],
         min: 6,
         max: 30
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
      arguments: {
         type: ArgumentSchema 
      }
   }
})