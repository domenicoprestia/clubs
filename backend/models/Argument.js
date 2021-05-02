const mongoose = reuqire('mongoose')

const ArgumentSchema = mongoose.Schema({
   username:{
      type: String,
      required: [true, "You can't comment withtout a name"]
   },
   phrase:{
      type: String, 
      required: [true, "You have to add the phrase in order to argument under a club"]
   },
   approvations:{
      type: BigInt
   }
})

module.exports = mongoose.model('Argument', ArgumentSchema)