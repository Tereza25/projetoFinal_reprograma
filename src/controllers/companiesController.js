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
    const { id, companyName, fantasyName, cnpj, occupationArea, city, phone, email, userName} = req.body
    companies.push({ id, companyName, fantasyName, cnpj, occupationArea, city, phone, email, userName })
    fs.writeFile("./src/models/companies.json", JSON.stringify(companies), 'utf8', function (err) { // gravando nova empresa no array de Empresas
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const companyFound = companies.find(companies => companies.id == id) // recupero a empresa que criei no array de Empresas    
            res.status(200).send(companyFound)
        }
    })
}

// http://localhost:3000/companies/5
const getCompany = (req, res) => {
    const companyId = req.params.id
    companies.find({ id }, function(err, companies){
        res.status(200).send(companies);
      })
    };

const updateCompany = (req, res) => {
    try {
        const companyId = req.params.id
        const companyToUpdate = req.body //Pego o corpo da requisição com as alterações 

        const companyFound = companies.find(company => company.id == companyId) // separo o candidato que irei atualizar      
        const companyIndex = companies.indexOf(companyFound) // separo o indice do candidato no array de candidatos

        if (companyIndex >= 0) { // verifico se o candidato existe no array de candidatos
            companies.splice(companyIndex, 1, companyToUpdate) //busco no array o candidato, excluo o registro antigo e substituo pelo novo 
        } else {
            res.status(404).send({ message: "Empresa não encontrada para ser atualizada" })
        }

        fs.writeFile("./src/models/companies.json", JSON.stringify(companies), 'utf8', function (err) { // gravo meu json de candidatos atualizado
            if (err) {
                res.status(500).send({ message: err }) // caso dê erro retorno status 500
            } else {
                console.log("Arquivo de empresas atualizado com sucesso!")
                const companyUpdated = companies.find(company => company.id == companyId) // separo o candidato que modifiquei no array
                res.status(200).send(companyUpdated) // envio o candidato modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) // caso dê erro retorno status 500
    }
}

const updateUserName = (req, res) => {
    try {
        const companyId = req.params.id // pego a informação do id no parametro da requisição
        const newUserName = req.body.userName // pego a informação de usuário no corpo da requisição. 

        const companyToUpdate = companies.find(company => company.id == companyId) // separo a empresa que irei mudar o usuário
        const companyIndex = companies.indexOf(companyToUpdate) // identifico o índice da empresa no meu array

        if (companyIndex >= 0) {
            // achei a empresa
            companyToUpdate.userName = newUserName // atribuo o novo usuário
            companies.splice(companyIndex, 1, companyToUpdate) 
            fs.writeFile("./src/models/companies.json", JSON.stringify(companies), 'utf8', function (err) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log("Arquivo de empresa foi atualizado com sucesso!")
                    const companyUpdated = companies.find(company => company.id == companyId)
                    res.status(200).send(companyUpdated)
                }
            })
        } else {
            
            res.status(400).send({ message: "Empresa não encontrado para atualizar o nome de usuário" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro na api")
    }

}

const deleteCompany = (req, res) => {
    try {
        const companyId = req.params.id
        const companyFound = companies.find(company => company.id == companyId) 
        const companyIndex = companies.indexOf(companyFound) 

        if (companyIndex >= 0) { 
            companies.splice(companyIndex, 1) 
        } else {
            res.status(404).send({ message: "Empresa não encontrada para ser deletada" })
        }

        fs.writeFile("./src/models/companies.json", JSON.stringify(companies), 'utf8', function (err) { 
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Empresa deletada com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a empresa" })
    }
}


module.exports = {
    createCompany,
    deleteCompany,
    updateCompany,
    updateUserName,
    getCompany,
    getAllCompanies,

}