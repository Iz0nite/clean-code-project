const { DateTime } = require("luxon");

const cardRepository = require("../../database/card-repository");

const { getQuizzQueryParamsSchema } = require("./schema");
const { getDayDelayByCategoryName, LAST_CATEGORY_NAME } = require("../Card/category")


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
  }

}

const exportedForTesting = {
  computeDayDifferenceBetweenTwoDate,
  selectCardsForQuizz
}

module.exports = {
  QuizzController,
  exportedForTesting
}