const { Router } = require("express")

const router = Router()

router.get("/", (req, res) => {
  return res.send("You are in /cards")
})


module.exports = router
