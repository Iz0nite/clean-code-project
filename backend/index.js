const express = require("express")

const SERVER_PORT = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/cards", require("./routes/cards"))

app.get("/", (req, res) => {
  return res.send("API working !")
})

app.use(function(req, res, next) {
  return res.status(404).json({ error: 'this route doesn\'t exist.' })
});

app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}`))