const candidates = require("../models/candidates.json")
const fs = require("fs")

const getAllCandidates = (req, res) => {
    console.log(req.url)
    console.log("Minha query string:")
    console.log(req.query)
    const deficiency = req.query.deficiency
    const area = req.query.area
    if (deficiency) {
        const candidatesByDeficiency = candidates.filter(candidate => candidate.deficiency.includes(deficiency))
        res.status(200).send(candidatesByDeficiency)
    } 
    if (area) {
        const candidatesByArea = candidates.filter(candidate => candidate.area.includes(area))
        res.status(200).send(candidatesByArea)
    } else {
        res.status(200).send(candidates)

    }
    
}

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
                const candidateUpdated = candidates.find(candidate => candidate.id == candidateId) // separo o candidato que modifiquei no array
                res.status(200).send(candidateUpdated) // envio o candidato modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) // caso dê erro retorno status 500
    }
}

const updateExperienceStatus = (req, res) => {
    try {
        const candidateId = req.params.id // pego a informação do id no parametro da requisição
        const newExperience = req.body.experience // pego a informação de experience no corpo da requisição. Ele terá valor true ou false, dependendo do que tiver sido passado

        const candidateToUpdate = candidates.find(candidate => candidate.id == candidateId) // separo o candidato que irei mudar o status
        const candidateIndex = candidates.indexOf(candidateToUpdate) // identifico o índice do candidato no meu array

        if (candidateIndex >= 0) {
            // achei o candidato
            candidateToUpdate.experience = newExperience // atribuo o novo status
            candidates.splice(candidateIndex, 1, candidateToUpdate) 
            fs.writeFile("./src/models/candidates.json", JSON.stringify(candidates), 'utf8', function (err) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log("Arquivo de candidato foi atualizado com sucesso!")
                    const candidateUpdated = candidates.find(candidate => candidate.id == candidateId)
                    res.status(200).send(candidateUpdated)
                }
            })
        } else {
            
            res.status(400).send({ message: "Candidato não encontrado para atualizar o status de experiencia" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro na api")
    }

}

const deleteCandidate = (req, res) => {
    try {
        const candidateId = req.params.id
        const candidateFound = candidates.find(candidate => candidate.id == candidateId) 
        const candidateIndex = candidates.indexOf(candidateFound) 

        if (candidateIndex >= 0) { 
            candidates.splice(candidateIndex, 1) 
        } else {
            res.status(404).send({ message: "Candidato não encontrado para ser deletado" })
        }

        fs.writeFile("./src/models/candidates.json", JSON.stringify(candidates), 'utf8', function (err) { 
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Candidato deletado com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o candidato" })
    }
}
          

module.exports = {
    createCandidate,
    deleteCandidate,
    updateCandidate, 
    updateExperienceStatus,  
    getCandidate,
    getAllCandidates,
} 