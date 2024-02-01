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
  
  insertCard: (cardToCreate) => {
    const card = {
      id: uuidv4(),
      ...cardToCreate
    }

    CARD_TABLE.push(card)

    return card
  }
}