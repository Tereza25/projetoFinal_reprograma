const express = require("express")
const router = express.Router()
const controller = require("../controllers/companiesController")

router.get("/", controller.getAllCompanies)
router.post("/", controller.createCompany)
router.get("/:id", controller.getCompany)
router.put("/:id", controller.updateCompany)
router.patch("/:id/userName", controller.updateUserName)
router.delete("/:id", controller.deleteCompany)


module.exports = router;

