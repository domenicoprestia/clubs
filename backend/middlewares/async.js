const asyncHandler = fn => (req,res,next) => {
   Promise.resolve(fm(req,res,next).catch(next))
}

module.exports = asyncHandler