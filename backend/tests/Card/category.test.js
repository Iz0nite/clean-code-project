const { getCategoryNameByIndex, getDayDelayByCategoryName, retrieveUpperCategoryName } = require('../../controllers/Card/category')

describe("Category functions", () => {
  describe("getCategoryNameByIndex", () => {
    it ("Should return a string", () => {
      const categoryName = getCategoryNameByIndex(2)

      expect(categoryName).toBeDefined()
      expect(typeof categoryName).toBe("string")
    })

    it ("Should return undefined", () => {
      const categoryName = getCategoryNameByIndex(-1)

      expect(categoryName).toBeUndefined()
    })
  })

  describe("getDayDelayByCategoryName", () => {
    it ("Should return a number", () => {
      const categoryDayDelay= getDayDelayByCategoryName("FOURTH")

      expect(categoryDayDelay).toBeDefined()
      expect(typeof categoryDayDelay).toBe("number")
    })

    it ("Should return undefined", () => {
      const categoryDayDelay= getDayDelayByCategoryName("I LOVE BANANAS")

      expect(categoryDayDelay).toBeUndefined()
    })
  })

  describe("retrieveUpperCategoryName", () => {
    it ("Should return a string", () => {
      const categoryName= retrieveUpperCategoryName("FOURTH")

      expect(categoryName).toBeDefined()
      expect(typeof categoryName).toBe("string")
    })

    it ("Should return undefined", () => {
      const categoryName= retrieveUpperCategoryName("I LOVE BANANAS")

      expect(categoryName).toBeUndefined()
    })
  })
})