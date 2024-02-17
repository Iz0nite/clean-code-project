import { describe, expect, test } from 'vitest'
import { formatDateToLocalString, formatQueryParams, sanitizeBody } from '../src/utils/helpers'

describe("Helpers functions", () => {
  describe("formatDateToLocalString", () => {
    test("Should return a string an a valid date", () => {
      const formatedDateToLocalString = formatDateToLocalString("2024-02-14")

      expect(typeof formatedDateToLocalString).toBe("string")
      expect(typeof formatedDateToLocalString).not.toEqual("Invalid Date")
    })

    test("Should return 'Invalid date'", () => {
      const formatedDateToLocalString = formatDateToLocalString("I'm not a date :(")

      expect(formatedDateToLocalString).toEqual("Invalid Date")
    })
  })

  describe("formatQueryParams", () => {
    test("Should return a formatted string from an object", () => {
      const formatedQueryParams = formatQueryParams({
        foo: "bar",
        lala: "lolo" 
      })

      expect(typeof formatedQueryParams).toBe("string")
      expect(formatedQueryParams).toEqual("?foo=bar&lala=lolo")
    })

    test("Should return a formatted string from an object with an array", () => {
      const formatedQueryParams = formatQueryParams({
        foo: "bar",
        lala: ["lolo", "lili"]
      })

      expect(typeof formatedQueryParams).toBe("string")
      expect(formatedQueryParams).toEqual("?foo=bar&lala=lolo&lala=lili")
    })

    test("Should return undefined", () => {
      const formatedQueryParams = formatQueryParams()

      expect(typeof formatedQueryParams).toBe("undefined")
    })
  })

  describe("sanitizeBody", () => {
    test("Should return an object without undefined value", () => {
      const sanitizedBody = sanitizeBody({
        foo: "bar",
        lala: undefined
      })

      expect(sanitizedBody).toMatchObject({
        foo: "bar"
      })
    })
  })
})