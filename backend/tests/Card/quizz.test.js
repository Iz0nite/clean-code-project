const httpMocks = require('node-mocks-http')
const { DateTime, Settings } = require('luxon')

const cardRepository = require("../../database/card-repository")

const { QuizzController, exportedForTesting } = require("../../controllers/Quizz")

const { computeDayDifferenceBetweenTwoDate, selectCardsForQuizz, updateCardInFunctionOftheAnswer } = exportedForTesting

const fakeCards = [
  {
    "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
    "category": "FIRST",
    "date": "2024-02-03T15:44:39.190Z",
    "question": "What is pair programming?",
    "answer": "A practice to work in pair on the same computer.",
    "tag": "Teamwork"
  },
  {
    "id": "b9028b87-3a4d-42f5-9d1f-8d865a2c3d51",
    "category": "SECOND",
    "date": "2024-02-03T16:30:00.000Z",
    "question": "Explain the concept of asynchronous programming.",
    "answer": "Executing operations independently of the main program flow.",
    "tag": "Programming"
  },
  {
    "id": "3d5d0a2b-9d61-4a97-b653-1e8620b2a58d",
    "category": "THIRD",
    "date": "2024-02-03T17:15:20.500Z",
    "question": "What is the purpose of version control?",
    "answer": "To track and manage changes to source code over time.",
    "tag": "Software Development"
  },
]

jest.spyOn(cardRepository, 'getCardCollection').mockReturnValue(fakeCards)
jest.spyOn(cardRepository, 'updateCardById').mockReturnValue()

const expectedNow = DateTime.local(2024, 2, 7, 23, 0, 0);
Settings.now = () => expectedNow.toMillis();

describe("Quizz creation", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("computeDayDifferenceBetweenTwoDate", () => {
    it('should return 2, because there is two days between date1 and date2', () => {
      const date1 = DateTime.fromJSDate(new Date('2023-02-03'))
      const date2 = DateTime.fromJSDate(new Date('2023-02-01'))
      expect(computeDayDifferenceBetweenTwoDate(date1, date2)).toEqual(2)
    })
  })

  describe("selectCardsForQuizz", () => {
    it('should return only the card with category FIRST', () => {
      const quizzDate = DateTime.fromJSDate(new Date('2024-02-04'))
      expect(selectCardsForQuizz(quizzDate, fakeCards)).toEqual([
        {
          "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
          "category": "FIRST",
          "date": "2024-02-03T15:44:39.190Z",
          "question": "What is pair programming?",
          "answer": "A practice to work in pair on the same computer.",
          "tag": "Teamwork"
        }
      ])
    })

    it('should return only the cards with category FIRST and SECOND', () => {
      const quizzDate = DateTime.fromJSDate(new Date('2024-02-05'))
      expect(selectCardsForQuizz(quizzDate, fakeCards)).toEqual([
        {
          "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
          "category": "FIRST",
          "date": "2024-02-03T15:44:39.190Z",
          "question": "What is pair programming?",
          "answer": "A practice to work in pair on the same computer.",
          "tag": "Teamwork"
        },
        {
          "id": "b9028b87-3a4d-42f5-9d1f-8d865a2c3d51",
          "category": "SECOND",
          "date": "2024-02-03T16:30:00.000Z",
          "question": "Explain the concept of asynchronous programming.",
          "answer": "Executing operations independently of the main program flow.",
          "tag": "Programming"
        }
      ])
    })

    it('should return all cards', () => {
      const quizzDate = DateTime.fromJSDate(new Date('2024-02-07'))
      expect(selectCardsForQuizz(quizzDate, fakeCards)).toEqual(fakeCards)
    })
  })

  describe("Quizz Controller: getQuizz", () => {
    it("Should return an error (422) because the queryParams are wrong", () => {
      const request = httpMocks.createRequest({
        query: {
          wrong: "What is this place ?",
        }
      })
  
      const response = httpMocks.createResponse()
  
      QuizzController.getQuizz(request, response)
  
      expect(response.statusCode).toEqual(422)
    })

    it("Should return a list of cards for the quizz, and use the date in the queryParams. So it will return only the firstCard", () => {
      const request = httpMocks.createRequest({
        query: {
          date: "2024-02-04"
        }
      })
  
      const response = httpMocks.createResponse()

      QuizzController.getQuizz(request, response)
  
      expect(response.statusCode).toEqual(200)
      expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
      expect(response._getJSONData()).toEqual([
        {
          "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
          "category": "FIRST",
          "date": "2024-02-03T15:44:39.190Z",
          "question": "What is pair programming?",
          "answer": "A practice to work in pair on the same computer.",
          "tag": "Teamwork"
        }
      ])
    })

    it("Should return a list of cards for the quizz, and use today's date. So it will return all cards", () => {
      const request = httpMocks.createRequest()
  
      const response = httpMocks.createResponse()

      QuizzController.getQuizz(request, response)
  
      expect(response.statusCode).toEqual(200)
      expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
      expect(response._getJSONData()).toEqual(fakeCards)
    })
  })
})

describe("Answer to a question", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("updateCardInFunctionOftheAnswer", () => {
    it("Should throw an error because the categroy mentionned in the card doesn't exist", () => {
      const card = {
        "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
        "category": "GOGOLITO",
        "date": "2024-02-03T15:44:39.190Z",
        "question": "What is pair programming?",
        "answer": "A practice to work in pair on the same computer.",
        "tag": "Teamwork"
      }
      
      const isValid = true

      expect(() => updateCardInFunctionOftheAnswer(card, isValid)).toThrow()
    })

    it("Should call cardRepository.updateCardById with te FIRST category and the date of today, because isValid is equal to false", () => {
      const card = {
        "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
        "category": "THIRD",
        "date": "2024-02-03T15:44:39.190Z",
        "question": "What is pair programming?",
        "answer": "A practice to work in pair on the same computer.",
        "tag": "Teamwork"
      }
      
      const isValid = false

      updateCardInFunctionOftheAnswer(card, isValid)

      expect(cardRepository.updateCardById).toHaveBeenCalledTimes(1)
      expect(cardRepository.updateCardById).toHaveBeenCalledWith(card.id, {
        ...card,
        category: "FIRST",
        date: expectedNow.toISO()
      })
    })

    it("Should call cardRepository.updateCardById with te FOURTH category and the date of today, because isValid is equal to true", () => {
      const card = {
        "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
        "category": "THIRD",
        "date": "2024-02-03T15:44:39.190Z",
        "question": "What is pair programming?",
        "answer": "A practice to work in pair on the same computer.",
        "tag": "Teamwork"
      }
      
      const isValid = true

      updateCardInFunctionOftheAnswer(card, isValid)

      expect(cardRepository.updateCardById).toHaveBeenCalledTimes(1)
      expect(cardRepository.updateCardById).toHaveBeenCalledWith(card.id, {
        ...card,
        category: "FOURTH",
        date: expectedNow.toISO()
      })
    })
  })

  describe("Quizz controller: answerQuestion", () => {
    it("Should return an error (422) because the body is not valide", () => {
      const request = httpMocks.createRequest({
        body: {
          wrong: "What is this place ?",
        }
      })
  
      const response = httpMocks.createResponse()

      QuizzController.answerQuestion(request, response)

      expect(response.statusCode).toEqual(422)
    })

    it("Should return an error (404) because the card in request has not been found", () => {
      const request = httpMocks.createRequest({
        body: {
          isValid: true,
        }
      })
  
      jest.spyOn(cardRepository, 'getCardById').mockReturnValue(undefined)
  
      const response = httpMocks.createResponse()
  
      QuizzController.answerQuestion(request, response)
  
      expect(response.statusCode).toEqual(404)
      expect(cardRepository.getCardById).toHaveBeenCalledTimes(1)
    })

    it("Should return an error (500) because the card used has a wrong category name", () => {
      const request = httpMocks.createRequest({
        body: {
          isValid: true,
        }
      })
  
      jest.spyOn(cardRepository, 'getCardById').mockReturnValue({
        "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
        "category": "MAMAMIA",
        "date": "2024-02-03T15:44:39.190Z",
        "question": "What is pair programming?",
        "answer": "A practice to work in pair on the same computer.",
        "tag": "Teamwork"
      })
  
      const response = httpMocks.createResponse()
  
      QuizzController.answerQuestion(request, response)
  
      expect(response.statusCode).toEqual(500)
      expect(cardRepository.getCardById).toHaveBeenCalledTimes(1)
    })

    it("Should return a 204 status because all informations are good", () => {
      const request = httpMocks.createRequest({
        body: {
          isValid: true,
        }
      })
  
      jest.spyOn(cardRepository, 'getCardById').mockReturnValue({
        "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
        "category": "SECOND",
        "date": "2024-02-03T15:44:39.190Z",
        "question": "What is pair programming?",
        "answer": "A practice to work in pair on the same computer.",
        "tag": "Teamwork"
      })
  
      const response = httpMocks.createResponse()
  
      QuizzController.answerQuestion(request, response)
  
      expect(response.statusCode).toEqual(204)
      expect(cardRepository.getCardById).toHaveBeenCalledTimes(1)
    })
  })

})