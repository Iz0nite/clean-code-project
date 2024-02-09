const Joi = require('joi');

const getQuizzQueryParamsSchema = Joi.object({
  date: Joi.string()
})

const answerQuestionBodySchema = Joi.object({
  isValid: Joi.boolean().required()
})

module.exports = {
  getQuizzQueryParamsSchema,
  answerQuestionBodySchema
}