const CardRepository = require('../../database/card-repository')

const { getCardsQueryParamsSchema, createCardBodySchema } = require('./schema')
const { formatTagsToArray } = require('./tag')
const { getCategoryNameByIndex } = require('./category')

const CardController = {
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
      category: getCategoryNameByIndex(0),
      date: new Date().toISOString(),
      ...validatedBody
    })

    return response.status(201).json(card)
  }
}

module.exports = {
  CardController
}