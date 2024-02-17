const { v4: uuidv4 } = require('uuid');

const CARD_TABLE = []

function filterCardsbyTags (tags) {
  return CARD_TABLE.filter(card => tags.includes(card.tag))
}

module.exports = {
  getCardCollection: (tags) => {
    if (!tags) { return CARD_TABLE }

    return filterCardsbyTags(tags)
  },
  getCardById: (cardId) => {
    return CARD_TABLE.find(card => card.id === cardId)
  },
  insertCard: (cardToCreate) => {
    const card = {
      id: uuidv4(),
      ...cardToCreate
    }

    CARD_TABLE.push(card)

    return card
  },
  updateCardById: (cardId, newCardData) => {
    const cardIndex = CARD_TABLE.findIndex(card => card.id === cardId)

    if (cardIndex !== undefined) {
      CARD_TABLE[cardIndex] = {
        ...CARD_TABLE[cardIndex],
        ...newCardData
      }
    }
  }
}