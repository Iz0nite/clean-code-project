const Joi = require('joi');

const getQuizzQueryParamsSchema = Joi.object({
  date: Joi.string()
})

module.exports = {
  getQuizzQueryParamsSchema
}