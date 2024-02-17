import { describe, test, vi, expect } from 'vitest'
import { exportedForTesting } from '../src/services/card.service'
import { QUERY_FUNCTION_ERRORS } from '../src/services/utils/query-function-errors'

const { fetchCardsQueryFunction, addCardQueryFunction } = exportedForTesting

describe("Card service", () => {
  describe("fetchCardsQueryFunction", () => {
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
    
      const result = await fetchCardsQueryFunction()
    
      expect(result).toEqual(mockedData)
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/cards$/))
    })

    test('Response should have been callded with corect queryParams, should be valid and should return mocked value', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockedData,
      })

      const queryParams = "?tags=foo&tags=bar"
    
      const result = await fetchCardsQueryFunction(queryParams)
    
      expect(result).toEqual(mockedData)
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/cards\?tags=foo&tags=bar$/))
    })
    
    test('Should throw an error with the correct error message', async () => {    
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: false })
    
      await expect(fetchCardsQueryFunction()).rejects.toThrowError(
        QUERY_FUNCTION_ERRORS.fetchCardsQueryFunction
      )
    })
  })

  describe("addCardQueryFunction", () => {
    const mockedRequestBody = {
      question: 'Are Armand and Théo handsome?',
      answer: 'Of course',
      tag: 'general knowledge',
    }
    
    test('Response should be valid, an called with good url, method and body', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
    
      const result = await addCardQueryFunction(mockedRequestBody)
    
      expect(result).toEqual({ success: true })
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/cards$/), expect.objectContaining({
        method: "POST",
        body: JSON.stringify(mockedRequestBody)
      }))
    })
    
    test('Response should be not valid, an send good error', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
      })
    
      await expect(addCardQueryFunction(mockedRequestBody)).rejects.toThrowError(
        QUERY_FUNCTION_ERRORS.addCardQueryFunction
      )
    })
  })
})