const httpMocks = require('node-mocks-http')

const cardController = require("../../controllers/Card")
const cardRepository = require("../../database/card-repository")

describe("Card creation", () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it ("Should return an error (422) because a required field (answer) is missing", () => {
    const request = httpMocks.createRequest({
      body: {
        question: "Am I the question ?",
      }
    })

    const response = httpMocks.createResponse()

    cardController.createCard(request, response)

    expect(response.statusCode).toEqual(422)
  })

  it ("Should return an error (422) because a field (tag) has the wrong type", () => {
    const request = httpMocks.createRequest({
      body: {
        question: "Am I the question ?",
        answer: "Yes you are",
        tag: 4
      }
    })

    const response = httpMocks.createResponse()

    cardController.createCard(request, response)

    expect(response.statusCode).toEqual(422)
  })

  it ("Should call the cardRepository to insert a card in DB and return the created card with a 201 status", () => {
    const request = httpMocks.createRequest({
      body: {
        question: "Am I the question ?",
        answer: "Yes you are",
        tag: "philosophy"
      }
    })

    const response = httpMocks.createResponse()

    jest.spyOn(cardRepository, 'insertCard').mockReturnValue({
      id: 1,
      category: "FIRST",
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })

    cardController.createCard(request, response)

    expect(response.statusCode).toEqual(201)
    expect(cardRepository.insertCard).toHaveBeenCalledTimes(1)
    expect(cardRepository.insertCard).toHaveBeenCalledWith({
      category: "FIRST",
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })
    expect(response._getJSONData()).toEqual({
      id: 1,
      category: "FIRST",
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })
  })
})