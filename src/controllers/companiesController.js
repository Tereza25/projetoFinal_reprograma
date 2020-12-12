const companies = require("../models/companies.json")

const getAllCompanies = (req, res) => {
    console.log(req.url)
    res.status(200).send(companies)
}

module.exports = {
    getAllCompanies,

}