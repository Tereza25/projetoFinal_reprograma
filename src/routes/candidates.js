const express = require("express")
const router = express.Router()
const controller = require("../controllers/candidateController")

router.get("/", controller.getAllCandidates)

router.post("/", controller.createCandidate)



module.exports = router;


