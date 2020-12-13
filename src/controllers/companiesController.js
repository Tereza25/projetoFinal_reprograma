const companies = require("../models/companies")


//http://localhost:3000/companies na rota GET
const getAllCompanies = (req, res) => {
    console.log(req.url);
    companies.find(function(err, companies){
      res.status(200).send(companies);
    })
  };

//http://localhost:3000/companies na rota POST
const createCompany = (req, res) => {
    console.log(req.body);

    let company = new companies(req.body)

    company.save(function(err){
        if(err) {
          res.status(500).send({ message: err.message })
        }
        res.status(201).send(company.toJSON())
    })
}

//http://localhost:3000/companies/5
const getCompany = (req, res) => {
    const id = req.params.id;

    companies.find({ id }, function(err, companies){
      if(err) { 
        res.status(500).send({ message: err.message })
      }
  
      res.status(200).send(companies);
    })
}

const getCity = (req, res) => {
    const parametros = req.query
    companies.find(parametros, function (err, companies) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(companies)
        }
    })
}



const updateCompany = (req, res) => {
    const id = req.params.id
    companies.updateMany({ id }, { $set : req.body }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "Empresa atualizado com sucesso"})
        }
    })
}

const deleteCompany = (req, res) => {
    const id = req.params.id
    companies.deleteMany({ id }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "Empresa removido com sucesso"})
        }
    })
}


module.exports = {
    getAllCompanies,
    getCity,
    getCompany,
    createCompany,
    deleteCompany,
    updateCompany
}