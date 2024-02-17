export function formatDateToLocalString (stringDate: string) {
  return new Date(stringDate).toLocaleString()
}

export function formatQueryParams(queryParams?: Record<string, string | string[]>) {
  const isQueryParamsDefined = !!(
    queryParams && Object.values(queryParams).find((value) => value !== undefined && value !== "")
  )

  if (isQueryParamsDefined) {
    const formatedQueryParams = Object.entries(queryParams)
      .filter(([, value]) => value !== undefined && value !== "" && value.length !== 0)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}=${value}`
        }

        return value.map(subValue => `${key}=${subValue}`).join("&")
      })
      .join("&")

    return `?${formatedQueryParams}`
  }
}

export function sanitizeBody (body: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(body).filter(([_key, value]) => !!value))
}