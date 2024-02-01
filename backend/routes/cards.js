const cardController = require("../controllers/Card")

const { Router } = require("express")

const router = Router()

router.get("/", cardController.getCards)

router.post("/", cardController.createCard)

router.get("/quizz", (req, res) => {
  return res.send("You are in /quizz")
})

router.patch("/:cardId/answer", (req, res) => {
  return res.send("You are in /answer")
})


module.exports = router
