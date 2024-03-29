const express = require("express")
const cors = require('cors')

const SERVER_PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/cards", require("./routes/cards"))

app.use(function(req, res, next) {
  return res.status(404).json({ error: 'this route doesn\'t exist.' })
});

app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}`))