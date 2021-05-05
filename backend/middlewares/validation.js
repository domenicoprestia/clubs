const Joi = require('joi')

exports.registerValidation = (data) => {
   const schema = Joi.object({
      username: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
   })
   return schema.validate(data)
}

exports.loginValidation = (data) => {
   const schema = Joi.object({
      username: Joi.string().min(6).required(),
      password: Joi.string().required()
   })
   return schema.validate(data)
}

exports.editValidation = (data) => {
   const schema = Joi.object({
      username: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
   })

   return schema.validate(data)
}

exports.clubValidation = (data) => {
   const schema = Joi.object({
      name: Joi.string().min(6).required(),
      topic: Joi.string().required(),
      question: Joi.string().required()
   })

   return schema.validate(data)
}

exports.argumentValidation = (data) => {
   const schema = Joi.object({
      argument: Joi.string().min(5).required(),
      clubSlug: Joi.string().required(),
   })

   return schema.validate(data)
}