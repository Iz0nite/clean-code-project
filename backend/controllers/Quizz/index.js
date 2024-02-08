const { DateTime } = require("luxon");

const cardRepository = require("../../database/card-repository");

const { getQuizzQueryParamsSchema, answerQuestionBodySchema } = require("./schema");
const { getDayDelayByCategoryName, retrieveUpperCategory, LAST_CATEGORY_NAME, getCategoryNameByIndex } = require("../Card/category")


function formateDateStringToDateObject (stringDate) {
  return stringDate ? DateTime.fromJSDate(new Date(stringDate)) : DateTime.now()
}

function computeDayDifferenceBetweenTwoDate (date1, date2) {
  const startOfTheDate1Day = date1.startOf('day')
  const startOfTheDate2Day = date2.startOf('day')
  return startOfTheDate1Day.diff(startOfTheDate2Day, 'days').days
}

function selectCardsForQuizz (quizzDate, cards) {
  return cards.filter(card => {
    if (card.category === LAST_CATEGORY_NAME) return false

    const dayDelay = getDayDelayByCategoryName(card.category)
    const dateOfLastAnswer = formateDateStringToDateObject(card.date)

    const dayDifference = computeDayDifferenceBetweenTwoDate(quizzDate, dateOfLastAnswer)

    return dayDifference >= dayDelay
  })
}

function updateCardInFunctionOftheAnswer (card, isValide) {
  const newCategory = isValide ? retrieveUpperCategory(card.category) : getCategoryNameByIndex(0)

  if (!newCategory) {
    throw new Error("An error occurred while retrieving the top category")
  }

  cardRepository.updateCardById(card.id, {
    ...card,
    category: newCategory,
    date: DateTime.now().toISO()
  })
}

const QuizzController = {
  getQuizz: (request, response) => {
    const { value: validatedQueryParams, error } = getQuizzQueryParamsSchema.validate(request.query)

    if (error) {
      return response.status(422).send(error.message)
    }

    const quizzDate = formateDateStringToDateObject(validatedQueryParams.date)

    const cards = cardRepository.getCardCollection()

    const selectedCardsForQuizz = selectCardsForQuizz(quizzDate, cards)

    return response.status(200).json(selectedCardsForQuizz)
  },
  answerQuestion: (request, response) => {
    const { value: validatedBody, error } = answerQuestionBodySchema.validate(request.body)

    if (error) {
      return response.status(422).send(error.message)
    }

    const card = cardRepository.getCardById(request.params.cardId)

    if (!card) {
      return response.status(404).send("Card not found")
    }

    try {
      updateCardInFunctionOftheAnswer(card, validatedBody.isValide)
      return response.sendStatus(204)
    } catch (error) {
      return response.sendStatus(500)
    }

  }
}

const exportedForTesting = {
  computeDayDifferenceBetweenTwoDate,
  selectCardsForQuizz,
  updateCardInFunctionOftheAnswer
}

module.exports = {
  QuizzController,
  exportedForTesting
}