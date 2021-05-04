const asyncHandler = require('../middlewares/async')
const { clubValidation } = require('../middlewares/validation')
const Club = require('../models/Club')
const User = require('../models/User')


exports.createClub = asyncHandler(async(req,res,next) => {
    const {error} = clubValidation(req.body)
    if(error) res.status(400).json({success: false, message: error.details[0].message})
    req.body.creator = req.user.username
    try{
        const club = await Club.create(req.body)
        console.log(club)
        req.user.clubs.push(club)
        await User.findByIdAndUpdate(req.user._id, req.user)
        res.status(200).json({success: true, data: club})
    }catch(err){
        if(err.code == 11000) res.status(400).json({success: false, message:`Club's name is duplicate`})
    }
})

exports.deleteClub = asyncHandler(async(req,res,next) => {
    const club = await Club.find({slug: req.params.slug})

    if(club[0].creator.username != req.user.username) return res.status(400).json({success: false, message: `You can delete only your own clubs`})
    
    try{
        await Club.remove({slug: req.params.slug})
        res.status(200).json({success: true, message: `Club deleted with success`})
    }catch(err){
        res.status(400).json({success: false, message: `There was an error in the process`})
    }
})

exports.approveClub = asyncHandler(async(req,res,next) => {
    
    let user = req.user
    let alreadyIn = false

    if(user.approvedClubs) if(user.approvedClubs.length > 0) user.approvedClubs.forEach((club, index) => {

        if(club._id == req.params._id) {

            user.approvedClubs.splice(index, 1)
            alreadyIn = true
        }
    })


    if(!alreadyIn) {

        const club = await Club.find({_id: req.params._id})
        user.approvedClubs.push(club[0])
        await User.findByIdAndUpdate(user._id, user)
        res.status(200).json({success: true, message: `Club added succesfully`})
    }
    else{
        await User.findByIdAndUpdate(user._id, user)
        res.status(200).json({success: true, message: `Club removed succesfully`})
    }


})



exports.argumentClub = asyncHandler(async(req,res,next) => {

})



exports.approveArgument = asyncHandler(async(req,res,next) => {

})



exports.getAllClubs = asyncHandler(async(req,res,next) => {

    const clubs = await Club.find()
    res.status(200).json({success: true, data: clubs})

})

exports.getClubsOnName = asyncHandler(async(req,res,next) => {

    let clubs 

   if(req.params.slug) {clubs = await Club.find({slug: req.params.slug})}

   if(clubs.length == 0) return res.status(400).json({success: false, message: "No clubs found with that name"})
   else res.status(200).json({success: true, data: clubs})
   
})

exports.getClubsOnTopic = asyncHandler(async(req,res,next) => {
    
   let clubs

   if(req.params.topic) {clubs = await Club.find({topic: req.params.topic})}

   if(clubs.length == 0) return res.status(400).json({success: false, message: "No clubs found with that topic"})
   else res.status(200).json({success: true, data: clubs})
})