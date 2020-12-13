const express = require("express")
const router = express.Router()
const controller = require("../controllers/companiesController")

router.get("/", controller.getAllCompanies)
router.get("/:id", controller.getCompany)
router.get("/city", controller.getCity)
router.post("/", controller.createCompany)
router.delete("/:id", controller.deleteCompany)
router.put("/:id", controller.updateCompany)


module.exports = router;

