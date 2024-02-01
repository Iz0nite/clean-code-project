const httpMocks = require('node-mocks-http')

const cardController = require("../../controllers/Card")
const cardRepository = require("../../database/card-repository")

const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

describe("Cards recovery", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it ("Should return an error (422) because the queryParams are wrong", () => {
    const request = httpMocks.createRequest({
      query: {
        wrong: "What is this place ?",
      }
    })

    const response = httpMocks.createResponse()

    cardController.getCards(request, response)

    expect(response.statusCode).toEqual(422)
  })

  it ("Should call the cardRepository to get a collection of card in DB, with no tags, and return an array", () => {
    const request = httpMocks.createRequest()

    const response = httpMocks.createResponse()

    jest.spyOn(cardRepository, 'getCardCollection').mockReturnValue(
      [
        {
          id: 1,
          category: "FIRST",
          date: new Date().toISOString(),
          question: "Am I the question ?",
          answer: "Yes you are",
          tag: "philosophy"
        }
      ]
    )

    cardController.getCards(request, response)

    expect(response.statusCode).toEqual(200)
    expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
    expect(cardRepository.getCardCollection).toHaveBeenCalledWith(undefined)
    expect(response._getJSONData()).toEqual([
      {
        id: 1,
        category: "FIRST",
        date: expect.stringMatching(isoPattern),
        question: "Am I the question ?",
        answer: "Yes you are",
        tag: "philosophy"
      }
    ])
  })

  it ("Should call the cardRepository to get a collection of card in DB, with one tag, and return an array", () => {
    const request = httpMocks.createRequest({
      query: {
        tags: "philosophy"
      }
    })

    const response = httpMocks.createResponse()

    jest.spyOn(cardRepository, 'getCardCollection').mockReturnValue(
      [
        {
          id: 1,
          category: "FIRST",
          date: new Date().toISOString(),
          question: "Am I the question ?",
          answer: "Yes you are",
          tag: "philosophy"
        }
      ]
    )

    cardController.getCards(request, response)

    expect(response.statusCode).toEqual(200)
    expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
    expect(cardRepository.getCardCollection).toHaveBeenCalledWith([ "philosophy" ])
    expect(response._getJSONData()).toEqual([
      {
        id: 1,
        category: "FIRST",
        date: expect.stringMatching(isoPattern),
        question: "Am I the question ?",
        answer: "Yes you are",
        tag: "philosophy"
      }
    ])
  })

  it ("Should call the cardRepository to get a collection of card in DB, with two tags, and return an array", () => {
    const request = httpMocks.createRequest({
      query: {
        tags: [ "philosophy", "art" ]
      }
    })

    const response = httpMocks.createResponse()

    jest.spyOn(cardRepository, 'getCardCollection').mockReturnValue(
      [
        {
          id: 1,
          category: "FIRST",
          date: new Date().toISOString(),
          question: "Am I the question ?",
          answer: "Yes you are",
          tag: "philosophy"
        }
      ]
    )

    cardController.getCards(request, response)

    expect(response.statusCode).toEqual(200)
    expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
    expect(cardRepository.getCardCollection).toHaveBeenCalledWith([ "philosophy", "art" ])
    expect(response._getJSONData()).toEqual([
      {
        id: 1,
        category: "FIRST",
        date: expect.stringMatching(isoPattern),
        question: "Am I the question ?",
        answer: "Yes you are",
        tag: "philosophy"
      }
    ])
  })
})

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
      date: new Date().toISOString(),
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })

    cardController.createCard(request, response)

    expect(response.statusCode).toEqual(201)
    expect(cardRepository.insertCard).toHaveBeenCalledTimes(1)
    expect(cardRepository.insertCard).toHaveBeenCalledWith({
      category: "FIRST",
      date: expect.stringMatching(isoPattern),
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })
    expect(response._getJSONData()).toEqual({
      id: 1,
      category: "FIRST",
      date: expect.stringMatching(isoPattern),
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })
  })
})