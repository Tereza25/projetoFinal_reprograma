const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({
    id: {type : Number},
    companyName: {type : String},
    fantasyName: {type : String},
    cnpj: {type : String},
    occupationArea: {type : Array},
    city: {type : String},
    phone: {type : String},
    email: {type : String},
    userName: {type : String}
},{
    versionKey: false    
});


const companies = mongoose.model('companies', companiesSchema);

module.exports = companies; 