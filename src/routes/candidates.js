const express = require("express")
const router = express.Router()
const controller = require("../controllers/candidateController")

router.get("/", controller.getAllCandidates)

router.post("/", controller.createCandidate)

router.get("/:id", controller.getCandidate)

router.put("/:id", controller.updateCandidate)



module.exports = router;


