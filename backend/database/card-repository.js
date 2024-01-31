const { v4: uuidv4 } = require('uuid');

const CARD_TABLE = []

module.exports = {
  insertCard: (cardToCreate) => {
    const card = {
      id: uuidv4(),
      ...cardToCreate
    }

    CARD_TABLE.push(card)

    return card
  }
}