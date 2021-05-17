const asyncHandler = require('../middlewares/async')
const { clubValidation, argumentValidation } = require('../middlewares/validation')
const Club = require('../models/Club')
const User = require('../models/User')
const Argument = require('../models/Argument')


exports.createClub = asyncHandler(async(req,res,next) => {
    req.body.approvals = 0
    const {error} = clubValidation(req.body)
    if(error) res.status(400).json({success: false, message: error.details[0].message})
    req.body.creator = req.user.username
    try{
        const club = await Club.create(req.body)
        req.user.clubs.push(club)
        await User.findByIdAndUpdate(req.user._id, req.user)

        res.status(200).json({success: true, data: club})
    }catch(err){
        if(err.code == 11000) res.status(400).json({success: false, message:`Club's name is duplicate`})

    }

})

exports.deleteClub = asyncHandler(async(req,res,next) => {
    const club = await Club.find({slug: req.params.slug})

    if(club[0].creator != req.user.username) return res.status(400).json({success: false, message: `You can delete only your own clubs`})
    
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
        await Club.findByIdAndUpdate(club._id, club)

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
    let user = req.user 
    let club = await Club.findById(req.params._id)

    if(!club) return res.status(400).json({success: false, message: `Club not found`})

    req.body.creator = user.username
    req.body.clubSlug = club.slug

    const {error} = argumentValidation(req.body)

    if(error) return res.status(200).json({success: false, message: error})

    try{
    const argument = await Argument.create(req.body)
    club.arguments.push(argument)
    await Club.findByIdAndUpdate(club._id, club)
    res.status(400).json({success: true, message: argument})

    }catch{
        res.status(400).json({success: false, message: `Something went wrong`})
    }
})



exports.approveArgument = asyncHandler(async(req,res,next) => {
    let user = req.user
    
    let alreadyIn = false

    if(user.approvedArguments) if(user.approvedArguments.length > 0) user.approvedArguments.forEach((club, index) => {
        if(club._id == req.params._id) {

            user.approvedArguments.splice(index, 1)
            alreadyIn = true
        }
    })

    if(!alreadyIn) {
        const argument = await Argument.find({_id: req.params._id})
        if(!argument[0]) return res.status(200).json({success: false, message: `Argument does not exist`})
        console.log(argument)
        user.approvedArguments.push(argument[0])

        await User.findByIdAndUpdate(user._id, user)
        
        res.status(200).json({success: true, message: `Argument approved succesfully`})
    }
    else{
        await User.findByIdAndUpdate(user._id, user)
        res.status(200).json({success: true, message: `Argument removed succesfully`})
    }

})



exports.getAllClubs = asyncHandler(async(req,res,next) => {

    const clubs = await Club.find()
    res.status(200).json({success: true, data: clubs})

})

exports.getClubOnName = asyncHandler(async(req,res,next) => {

    let clubs 

   if(req.params.slug) {clubs = await Club.find({slug: req.params.slug})}

   if(clubs.length == 0) return res.status(400).json({success: false, message: "No clubs found with that slug"})
   else res.status(200).json({success: true, data: clubs})
   
})

exports.getClubsOnName = asyncHandler(async(req,res,next) => {
    let clubs 
    let resClubs = []

    if(req.params.slug) {clubs = await Club.find()}
    if(clubs.length == 0) return res.status(400).json({success: false, message: "No clubs found with that slug"})

    clubs.forEach(club => {
        if(club.slug.includes(req.params.slug)) resClubs.push(club)
    })
    
    res.status(200).json({success: true, data: resClubs})
})


exports.getClubsOnTopic = asyncHandler(async(req,res,next) => {
    
   let clubs
   let resClubs = []

   if(req.params.topic) {clubs = await Club.find()}
   if(clubs.length == 0) return res.status(400).json({success: false, message: "No clubs found with that topic"})
  
   clubs.forEach(club => {
    if(club.topic.includes(req.params.topic)) resClubs.push(club)
    })

    res.status(200).json({success: true, data: resClubs})
})

exports.getTopClubs = asyncHandler(async(req,res,next) => {

    let clubs = await Club.aggregate([{
           "$project": {
            "arguments": 1,
            "length": { "$size": "$arguments" }
        }},
        { "$sort": { "length": -1 } },
        { "$limit": 5 }
        ])

    if(clubs.length == 0) return res.status(400).json({success: false, message: "No existing clubs"})
    else return res.status(200).json({success: true, data: clubs})
})