const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const ClubSchema = mongoose.Schema({
   
      name: {
         type: String,
         required: [true, "Please add a club name"],
         min: 6,
         max: 30,
         unique: true
      },
      slug: {
         type: String, 
         reuqired: [true],
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
         type: Array
      },
      approvals: {
         type: Number
      },
      creator: {
         type: Object,
         required: [true, "You cant create a club without a creator"]
      }
})

ClubSchema.pre('save', function(){
   this.slug = slugify(this.name, {lower: true})
})

module.exports = mongoose.model('Club', ClubSchema)