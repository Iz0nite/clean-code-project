import { formatQueryParams, sanitizeBody } from "@/utils/helpers"
import { Card } from "@/utils/types"
import { useMutation, useQuery } from "@tanstack/react-query"

type useFetchCardsQueryParams = {
  tags: string[]
}

async function fetchCardsQueryFunction (url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Something went wrong with the request (getCards)")
  }

  return await response.json()
}

export function useFetchCards (queryParams?: useFetchCardsQueryParams) {
  const formatedQueryParams = formatQueryParams(queryParams)
  const url = formatedQueryParams ? `${import.meta.env.VITE_API_URL}/cards${formatedQueryParams}` : `${import.meta.env.VITE_API_URL}/cards`

  return useQuery<Card[]>(
    {
      queryKey: ["getCards", url],
      queryFn: async () => fetchCardsQueryFunction(url),
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
    throw new Error("Something went wrong with the request (addCard)")
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