const express = require("express")
const router = express.Router()
const controller = require("../controllers/companiesController")

router.get("/", controller.getAllCompanies)

module.exports = router;