const Joi = require('joi');

const CardRepository = require('../../database/card-repository')
const { CATEGORY } = require('../Category')

const cardSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  tag: Joi.string()
})

module.exports = {
  createCard: (request, response) => {
    const { value: validatedValues, error } = cardSchema.validate(request.body)

    if (error) {
      return response.status(422).send(error.message)
    }

    const card = CardRepository.insertCard({
      category: CATEGORY[0],
      ...validatedValues
    })

    return response.status(201).json(card)
  }
}