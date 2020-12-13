const express = require("express")
const router = express.Router()
const controller = require("../controllers/candidateController")

router.get("/", controller.getAllCandidates)
router.get("/:id", controller.getCandidate)
router.get("/area", controller.getPorArea)
router.get("/experience", controller.getExperience)
router.post("/", controller.createCandidate)
router.delete("/:id", controller.deleteCandidate)
router.put("/:id", controller.updateCandidate)

module.exports = router;


