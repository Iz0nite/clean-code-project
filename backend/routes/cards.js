const { CardController } = require("../controllers/Card")
const { QuizzController } = require("../controllers/Quizz")

const { Router } = require("express")

const router = Router()

router.get("/", CardController.getCards)

router.post("/", CardController.createCard)

router.get("/quizz", QuizzController.getQuizz)

router.patch("/:cardId/answer", (req, res) => {
  return res.send("You are in /answer")
})


module.exports = router
