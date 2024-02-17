import { formatQueryParams, sanitizeBody } from "@/utils/helpers"
import { Card } from "@/utils/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_FUNCTION_ERRORS } from "./utils/query-function-errors"

type useFetchCardsQueryParams = {
  tags: string[]
}

async function fetchCardsQueryFunction (formatedQueryParams?: string) {
  const url = formatedQueryParams ? `${import.meta.env.VITE_API_URL}/cards${formatedQueryParams}` : `${import.meta.env.VITE_API_URL}/cards`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(QUERY_FUNCTION_ERRORS.fetchCardsQueryFunction)
  }

  return await response.json()
}

export function useFetchCards (queryParams?: useFetchCardsQueryParams) {
  const formatedQueryParams = formatQueryParams(queryParams)

  return useQuery<Card[]>(
    {
      queryKey: ["getCards", formatedQueryParams],
      queryFn: async () => fetchCardsQueryFunction(formatedQueryParams),
      retry: false
    }
  )
}

type AddCardBodySchema = {
  question: string
  answer: string
  tag?: string
}

async function addCardQueryFunction (body: AddCardBodySchema) {
  const sanitizedBody = sanitizeBody(body)
      
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sanitizedBody)
  })

  if (!response.ok) {
    throw new Error(QUERY_FUNCTION_ERRORS.addCardQueryFunction)
  }

  return await response.json()
}

export function useAddCard ({ onSuccess, onError }: { onSuccess: () => void; onError: () => void }) {
  return useMutation({
    mutationFn: async (body: AddCardBodySchema) => addCardQueryFunction(body),
    onSuccess,
    onError,
    retry: false,
  })
}

export const exportedForTesting = {
  fetchCardsQueryFunction,
  addCardQueryFunction
}