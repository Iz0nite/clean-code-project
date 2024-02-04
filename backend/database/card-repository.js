const { v4: uuidv4 } = require('uuid');

const CARD_TABLE = [
  {
    "id": "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
    "category": "FIRST",
    "date": "2024-02-03T15:44:39.190Z",
    "question": "What is pair programming?",
    "answer": "A practice to work in pair on the same computer.",
    "tag": "Teamwork"
  },
  {
    "id": "b9028b87-3a4d-42f5-9d1f-8d865a2c3d51",
    "category": "SECOND",
    "date": "2024-02-03T16:30:00.000Z",
    "question": "Explain the concept of asynchronous programming.",
    "answer": "Executing operations independently of the main program flow.",
    "tag": "Programming"
  },
  {
    "id": "3d5d0a2b-9d61-4a97-b653-1e8620b2a58d",
    "category": "THIRD",
    "date": "2024-02-03T17:15:20.500Z",
    "question": "What is the purpose of version control?",
    "answer": "To track and manage changes to source code over time.",
    "tag": "Software Development"
  },
];

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