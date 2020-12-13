const candidates = require("../models/candidates")


const getAllCandidates = (req, res) => {
    console.log(req.url);
    candidates.find(function(err, candidates){
      res.status(200).send(candidates);
    })
  };

const createCandidate = (req, res) => {
    console.log(req.body);

    let candidate = new candidates(req.body)

    candidate.save(function(err){
        if(err) {
          res.status(500).send({ message: err.message })
        }
        res.status(201).send(candidate.toJSON())
    })
}


const getCandidate = (req, res) => {
    const id = req.params.id;

    candidates.find({ id }, function(err, candidates){
      if(err) { 
        res.status(500).send({ message: err.message })
      }
  
      res.status(200).send(candidates);
    })
}

const getPorArea = (req, res) => {
    const parametros = req.query
    candidates.find(parametros, function (err, candidates) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(candidates)
        }
    })
}


const getExperience = (req, res) => {
    candidates.find({ experience: true }, function (err, candidates) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(candidates)
        }
    })
}


const updateCandidate = (req, res) => {
    const id = req.params.id
    candidates.updateMany({ id }, { $set : req.body }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "Candidato atualizado com sucesso"})
        }
    })
}

const deleteCandidate = (req, res) => {
    const id = req.params.id
    candidates.deleteMany({ id }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "Candidato removido com sucesso"})
        }
    })
}
          

module.exports = {
    getAllCandidates,
    getCandidate,
    getPorArea,
    getExperience,
    createCandidate,
    deleteCandidate, 
    updateCandidate
} 