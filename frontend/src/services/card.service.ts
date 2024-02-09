import { formatQueryParams } from "@/utils/helpers"
import { Card } from "@/utils/types"
import { useMutation, useQuery } from "@tanstack/react-query"

type useFetchCardsQueryParams = {
  tags: string[]
}

export function useFetchCards (queryParams?: useFetchCardsQueryParams) {
  const formatedQueryParams = formatQueryParams(queryParams)
  const url = formatedQueryParams ? `${import.meta.env.VITE_API_URL}/cards${formatedQueryParams}` : `${import.meta.env.VITE_API_URL}/cards`

  return useQuery<Card[]>(
    {
      queryKey: ["getCards", url],
      queryFn: async () => {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Something went wrong with the request (getCards)")
        }
  
        return await response.json()
      },
      retry: false
    }
  )
}

type AddCardBodySchema = {
  question: string
  answer: string
  tag?: string
}

function sanitizeAddCardBody (body: AddCardBodySchema) {
  return Object.fromEntries(Object.entries(body).filter(([_key, value]) => !!value))
}

export function useAddCard ({ onSuccess, onError }: { onSuccess: () => void; onError: () => void }) {
  return useMutation({
    mutationFn: async (body: AddCardBodySchema) => {
      const sanitizedBody = sanitizeAddCardBody(body)
      
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
    },
    onSuccess,
    onError,
    retry: false,
  })
}