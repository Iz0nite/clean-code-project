import { formatQueryParams } from "@/utils/helpers"
import { Card } from "@/utils/types"
import { useMutation, useQuery } from "@tanstack/react-query"

type useFetchQuizzQueryParams = {
  date?: string
}

async function fetchQuizzQueryFunction (url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Something went wrong with the request (getQuizz)")
  }

  return await response.json()
}

export function useFetchQuizz (queryParams?: useFetchQuizzQueryParams) {
  const formatedQueryParams = formatQueryParams(queryParams)
  const url = formatedQueryParams ? `${import.meta.env.VITE_API_URL}/cards/quizz${formatedQueryParams}` : `${import.meta.env.VITE_API_URL}/cards/quizz`  

  return useQuery<Card[]>(
    {
      queryKey: ["getQuizz", url],
      queryFn: async () => fetchQuizzQueryFunction(url),
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
    throw new Error("Something went wrong with the request (answerQuestion)")
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