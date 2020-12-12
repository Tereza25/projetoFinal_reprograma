const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

mongoose.connect("mongodb://localhost:27017/reprograma", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//conexão com o mongo
let db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso.")
})

//rotas
const index = require("./routes/index")
const candidates = require("./routes/candidates")
const companies = require("./routes/companies")


app.use(bodyParser.json());

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
app.use("/companies", companies)

module.exports = app


