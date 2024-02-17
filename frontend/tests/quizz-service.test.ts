import { describe, test, vi, expect } from 'vitest'
import { exportedForTesting } from '../src/services/quizz.service'
import { QUERY_FUNCTION_ERRORS } from '../src/services/utils/query-function-errors'

const { fetchQuizzQueryFunction, answerQuestionQueryFunction } = exportedForTesting

describe("Quizz  service", () => {
  describe("fetchQuizzQueryFunction", () => {
    const mockedData = [
      {
        "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
        "category": "FIRST",
        "date": "2024-02-08T15:44:39.190Z",
        "question": "What is pair programming?",
        "answer": "A practice to work in pair on the same computer.",
        "tag": "Teamwork"
      },
      {
        "id": "b9028b87-3a4d-42f5-9d1f-8d865a2c3d51",
        "category": "FIRST",
        "date": "2024-02-08T16:30:00.000Z",
        "question": "Explain the concept of asynchronous programming.",
        "answer": "Executing operations independently of the main program flow.",
        "tag": "Programming"
      }
    ]

    test('Response should be valid and should return mocked value', async () => {
      
    
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockedData,
      })
    
      const result = await fetchQuizzQueryFunction()
    
      expect(result).toEqual(mockedData)
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/quizz$/))
    })

    test('Response should have been callded with corect queryParams, should be valid and should return mocked value', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockedData,
      })

      const queryParams = "?date=2024-02-14"
    
      const result = await fetchQuizzQueryFunction(queryParams)
    
      expect(result).toEqual(mockedData)
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/quizz\?date=2024-02-14$/))
    })
    
    test('Should throw an error with the correct error message', async () => {    
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: false })
    
      await expect(fetchQuizzQueryFunction()).rejects.toThrowError(
        QUERY_FUNCTION_ERRORS.fetchQuizzQueryFunction
      )
    })
  })

  describe("answerQuestionQueryFunction", () => {
    const cardId = "1"
    const mockedRequestBody = {
      isValid: true
    }
    
    test('Response should be valid, an called with good url, method and body', async ({ expect }) => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
    
      await answerQuestionQueryFunction(cardId, mockedRequestBody)
    
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/answer$/), expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify(mockedRequestBody)
      }))
    })
    
    test('Response should be not valid, an send good error', async ({ expect }) => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
      })
    
      await expect(answerQuestionQueryFunction(cardId, mockedRequestBody)).rejects.toThrowError(
        QUERY_FUNCTION_ERRORS.answerQuestionQueryFunction
      )
    })
  })
})