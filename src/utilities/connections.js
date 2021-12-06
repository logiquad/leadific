const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/Leadific_DB";

// --------------------- Domain Collection ----------------------------
let DomainSchema = new Schema({
    domainName: {type: String, unique: true }, 
    ownerName: String, 
    ownerId: String,
    domainId: String
}, { collection: "Domains" })
DomainSchema.plugin(mongoose_fuzzy_searching, { fields: ['domainName', 'ownerName', 'ownerId'] })

let collection = {};

// get domain collection from domains model
collection.getDomainCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Domains', DomainSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}


module.exports = collection;
