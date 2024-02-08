import { formatQueryParams } from "@/utils/helpers"
import { Card } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"

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
          throw new Error("Something went wrong with the request (getSessions)")
        }
  
        return await response.json()
      },
      retry: false
    }
  )
}