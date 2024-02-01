const Joi = require('joi');

const CardRepository = require('../../database/card-repository')
const { CATEGORY } = require('../Category')

const getCardsQueryParamsSchema = Joi.object({
  tags: [Joi.array().items(Joi.string()).min(1), Joi.string()]
})

const createCardBodySchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  tag: Joi.string()
})

function formatTagsToArray (tags) {
  return typeof tags === "string" ? [ tags ] : tags
}

module.exports = {
  getCards: (request, response) => {
    const { value: validatedQueryParams, error } = getCardsQueryParamsSchema.validate(request.query)

    if (error) {
      return response.status(422).send(error.message)
    }

    const tags = formatTagsToArray(validatedQueryParams.tags)

    return response.status(200).json(CardRepository.getCardCollection(tags))
  },
  createCard: (request, response) => {
    const { value: validatedBody, error } = createCardBodySchema.validate(request.body)

    if (error) {
      return response.status(422).send(error.message)
    }

    const card = CardRepository.insertCard({
      category: CATEGORY[0],
      ...validatedBody
    })

    return response.status(201).json(card)
  }
}