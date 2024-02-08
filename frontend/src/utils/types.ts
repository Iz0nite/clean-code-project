const CATEGORIES = [ "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "DONE" ] as const

export type Card = {
  id: string
  category:  typeof CATEGORIES[number]
  question: string
  answer: string
  tag: string,
  date: string
}