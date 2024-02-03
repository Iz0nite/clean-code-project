const CATEGORIES_BY_NAME_AND_DAY_DELAY = [ 
  {categoryName: "FIRST", dayDelay: 0},
  {categoryName: "SECOND", dayDelay: 2},
  {categoryName: "THIRD", dayDelay: 4},
  {categoryName: "FOURTH", dayDelay: 8},
  {categoryName: "FIFTH", dayDelay: 16},
  {categoryName: "SIXTH", dayDelay: 32},
  {categoryName: "SEVENTH", dayDelay: 64}
]

const LAST_CATEGORY_NAME = "DONE"

function getCategoryNameByIndex (index) {
  return CATEGORIES_BY_NAME_AND_DAY_DELAY[index].categoryName
}

function getDayDelayByCategoryName (categoryName) {
  return CATEGORIES_BY_NAME_AND_DAY_DELAY.find(category => category.categoryName === categoryName).dayDelay
}

module.exports = {
  getCategoryNameByIndex,
  getDayDelayByCategoryName,
  LAST_CATEGORY_NAME
}