const express = require("express")
const app = express()

app.use(express.json())


const index = require("./routes/index")
const candidates = require("./routes/candidates")

app.use(function (req, res, next) {
    res.header("Acces-Control-Alow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})
app.use("/", index)
app.use("/candidates", candidates)

module.exports = app