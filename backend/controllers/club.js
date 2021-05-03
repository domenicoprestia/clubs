const asyncHandler = require('../middlewares/async')
const { clubValidation } = require('../middlewares/validation')
const Club = require('../models/Club')


exports.createClub = asyncHandler(async(req,res,next) => {


    const {error} = clubValidation(req.body)
    if(error) res.status(400).json({success: false, message: error.details[0].message})

    try{
        const club = Club.create(req.body)
        res.status(200).json({success: true, message: club})
    }catch(err){
        if(err.code == 11000) res.status(400).json({success: false, message:'Username or email are duplicates'})
    }
})

