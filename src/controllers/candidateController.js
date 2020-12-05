const candidates = require("../models/candidates.json")

const getAllCandidates = (req, res) => {
    console.log(req.url)
    res.status(200).send(candidates)
}

const fs = require("fs")

const createCandidate = (req, res) => {
    const { id, name, birth, genre, deficiency, breed, city, schooling, language, experience, area, phone, email, status} = req.body
    candidates.push({ id, name, birth, genre, deficiency, breed, city, schooling, language, experience, area, phone, email, status })
    fs.writeFile("./src/models/candidates.json", JSON.stringify(candidates), 'utf8', function (err) { // gravando novo candidato no array de Candidatos
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const candidateFound = candidates.find(candidate => candidate.id == id) // recupero o candidato que foi criei no array de Candidatos     
            res.status(200).send(candidateFound)
        }
    })
}









module.exports = {
    createCandidate,
    getAllCandidates,
}