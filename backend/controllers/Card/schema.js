const Joi = require('joi');

const getCardsQueryParamsSchema = Joi.object({
  tags: [Joi.array().items(Joi.string()).min(1), Joi.string()]
})

const createCardBodySchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  tag: Joi.string()
})

module.exports = {
  getCardsQueryParamsSchema,
  createCardBodySchema
}