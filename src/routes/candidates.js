const express = require("express")
const router = express.Router()
const controller = require("../controllers/candidateController")

router.get("/", controller.getAllCandidates)

router.post("/", controller.createCandidate)

router.get("/:id", controller.getCandidate)

router.put("/:id", controller.updateCandidate)

router.patch("/:id/experience", controller.updateExperienceStatus)

router.delete("/:id", controller.deleteCandidate)


module.exports = router;


