const mongoose = require('mongoose');

const candidatesSchema = new mongoose.Schema({
    id: {type : Number},
    name: {type : String},
    birth: {type : String},
    genre: {type : String},
    deficiency: {type : Array},
    breed: {type : String},
    city: {type : String},
    schooling: {type : String},
    language: {type : String},
    experience: {type : Boolean},
    area: {type : Array},
    phone: {type : String},
    email: {type : String},
    status: {type : String}
},{
    versionKey: false    
});


const candidates = mongoose.model('candidates', candidatesSchema);

module.exports = candidates; 