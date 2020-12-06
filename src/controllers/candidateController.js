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

const getCandidate = (req, res) => {
    const candidateId = req.params.id
    const candidateFound = candidates.find((candidate) => candidate.id == candidateId)
    if (candidateFound) {
        res.status(200).send(candidateFound)
    } else {
        res.status(404).send({ message: "Candidato não encontrado" })
    }
}

const updateCandidate = (req, res) => {
    try {
        const candidateId = req.params.id
        const candidateToUpdate = req.body //Pego o corpo da requisição com as alterações 

        const candidateFound = candidates.find(candidate => candidate.id == candidateId) // separo o candidato que irei atualizar      
        const candidateIndex = candidates.indexOf(candidateFound) // separo o indice do candidato no array de candidatos

        if (candidateIndex >= 0) { // verifico se o candidato existe no array de candidatos
            candidates.splice(candidateIndex, 1, candidateToUpdate) //busco no array o candidato, excluo o registro antigo e substituo pelo novo 
        } else {
            res.status(404).send({ message: "Candidato não encontrado para ser atualizado" })
        }

        fs.writeFile("./src/models/candidates.json", JSON.stringify(candidates), 'utf8', function (err) { // gravo meu json de candidatos atualizado
            if (err) {
                res.status(500).send({ message: err }) // caso dê erro retorno status 500
            } else {
                console.log("Arquivo de candidatos atualizado com sucesso!")
                const candidateUpdated = candidates.find(candidate => candidate.id == candidateId) // separo o filme que modifiquei no array
                res.status(200).send(candidateUpdated) // envio o candidato modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) // caso dê erro retorno status 500
    }
}


module.exports = {
    createCandidate,
    updateCandidate, 
    getCandidate,
    getAllCandidates,
} 