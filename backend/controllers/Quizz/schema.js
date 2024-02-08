const Joi = require('joi');

const getQuizzQueryParamsSchema = Joi.object({
  date: Joi.string()
})

const answerQuestionBodySchema = Joi.object({
  isValide: Joi.boolean().required()
})

module.exports = {
  getQuizzQueryParamsSchema,
  answerQuestionBodySchema
}