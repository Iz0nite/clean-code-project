import { formatQueryParams } from "@/utils/helpers"
import { Card } from "@/utils/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_FUNCTION_ERRORS } from "./utils/query-function-errors"

type useFetchQuizzQueryParams = {
  date?: string
}

async function fetchQuizzQueryFunction (formatedQueryParams?: string) {
  const url = formatedQueryParams ? `${import.meta.env.VITE_API_URL}/cards/quizz${formatedQueryParams}` : `${import.meta.env.VITE_API_URL}/cards/quizz`  

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(QUERY_FUNCTION_ERRORS.fetchQuizzQueryFunction)
  }

  return await response.json()
}

export function useFetchQuizz (queryParams?: useFetchQuizzQueryParams) {
  const formatedQueryParams = formatQueryParams(queryParams)

  return useQuery<Card[]>(
    {
      queryKey: ["getQuizz", formatedQueryParams],
      queryFn: async () => fetchQuizzQueryFunction(formatedQueryParams),
      retry: false,
      enabled: !!formatedQueryParams
    }
  )
}

type AnswerQuestionBodySchema = {
  isValid: boolean
}

async function answerQuestionQueryFunction (cardId: string, body: AnswerQuestionBodySchema) {      
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cards/${cardId}/answer`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error(QUERY_FUNCTION_ERRORS.answerQuestionQueryFunction)
  }
}

export function useAnswerQuestion ({ onSuccess, onError }: { onSuccess: () => void; onError: () => void }) {
  return useMutation({
    mutationFn: async ({cardId, body}: {cardId: string, body: AnswerQuestionBodySchema}) => answerQuestionQueryFunction(cardId, body),
    onSuccess,
    onError,
    retry: false,
  })
}

export const exportedForTesting = {
  fetchQuizzQueryFunction,
  answerQuestionQueryFunction
}