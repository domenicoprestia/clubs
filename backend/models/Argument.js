const mongoose = require('mongoose')

const ArgumentSchema = mongoose.Schema({
   creator:{
      type: String,
      required: [true, "You can't comment withtout a name"]
   },
   argument:{
      type: String, 
      required: [true, "You have to add the phrase in order to argument under a club"]
   },
   approvals:{
      type: Number
   },
   createdAt:{
      type: Date,
      default: Date.now
   },
   clubSlug:{
      type: String,
      required: [true]
   }
})

module.exports = mongoose.model('Argument', ArgumentSchema)