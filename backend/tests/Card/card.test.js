const httpMocks = require('node-mocks-http')
const { DateTime, Settings } = require('luxon')

const cardRepository = require("../../database/card-repository")
const { CardController } = require('../../controllers/Card')

const expectedNow = DateTime.local(2024, 2, 7, 23, 0, 0);
Settings.now = () => expectedNow.toMillis();

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

    CardController.getCards(request, response)

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
          date: DateTime.now().toISO(),
          question: "Am I the question ?",
          answer: "Yes you are",
          tag: "philosophy"
        }
      ]
    )

    CardController.getCards(request, response)

    expect(response.statusCode).toEqual(200)
    expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
    expect(cardRepository.getCardCollection).toHaveBeenCalledWith(undefined)
    expect(response._getJSONData()).toEqual([
      {
        id: 1,
        category: "FIRST",
        date: expectedNow.toISO(),
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
          date: DateTime.now().toISO(),
          question: "Am I the question ?",
          answer: "Yes you are",
          tag: "philosophy"
        }
      ]
    )

    CardController.getCards(request, response)

    expect(response.statusCode).toEqual(200)
    expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
    expect(cardRepository.getCardCollection).toHaveBeenCalledWith([ "philosophy" ])
    expect(response._getJSONData()).toEqual([
      {
        id: 1,
        category: "FIRST",
        date: expectedNow.toISO(),
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
          date: DateTime.now().toISO(),
          question: "Am I the question ?",
          answer: "Yes you are",
          tag: "philosophy"
        }
      ]
    )

    CardController.getCards(request, response)

    expect(response.statusCode).toEqual(200)
    expect(cardRepository.getCardCollection).toHaveBeenCalledTimes(1)
    expect(cardRepository.getCardCollection).toHaveBeenCalledWith([ "philosophy", "art" ])
    expect(response._getJSONData()).toEqual([
      {
        id: 1,
        category: "FIRST",
        date: expectedNow.toISO(),
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

    CardController.createCard(request, response)

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

    CardController.createCard(request, response)

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
      date: DateTime.now().toISO(),
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })

    CardController.createCard(request, response)

    expect(response.statusCode).toEqual(201)
    expect(cardRepository.insertCard).toHaveBeenCalledTimes(1)
    expect(cardRepository.insertCard).toHaveBeenCalledWith({
      category: "FIRST",
      date: expectedNow.toISO(),
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })
    expect(response._getJSONData()).toEqual({
      id: 1,
      category: "FIRST",
      date: expectedNow.toISO(),
      question: "Am I the question ?",
      answer: "Yes you are",
      tag: "philosophy"
    })
  })
})