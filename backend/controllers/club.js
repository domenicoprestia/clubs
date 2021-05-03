const asyncHandler = require('../middlewares/async')
const { clubValidation } = require('../middlewares/validation')
const Club = require('../models/Club')


exports.createClub = asyncHandler(async(req,res,next) => {
    const {error} = clubValidation(req.body)
    if(error) res.status(400).json({success: false, message: error.details[0].message})
    req.body.creator = req.user 
    try{
        const club = await Club.create(req.body)
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

})


exports.argumentClub = asyncHandler(async(req,res,next) => {

})



exports.approveArgument = asyncHandler(async(req,res,next) => {

})

exports.getAllClubs = asyncHandler(async(req,res,next) => {

})

exports.getClubsOnName = asyncHandler(async(req,res,next) => {

})

exports.getClubOnTopic = asyncHandler(async(req,res,next) => {
    
})