const connection = require("../utilities/connections")
const domainDB = {}

// Add a new Domain record into the collection.
domainDB.addDomain = (domainObject) => {
    return connection.getDomainCollection().then(domainModel => {
        return domainModel.create(domainObject).then(addedDomain => {

            if(addedDomain){
                return addedDomain;
            }else {
                return null;
            }
        })
    })
}

// get all domains existing in the collection query
domainDB.getAllDomains = (offset, limit) => {
    return connection.getDomainCollection().then(domainModel => {
        return domainModel.find({}, {_id: 0, __v: 0}).skip(offset).limit(limit).then(domainsList => {
            
            if(domainsList.length > 0){
                return domainsList
            }else {
                return null;
            }
        })
    })
}

// Get all domains by an ownerID query
domainDB.getDomainsByOwner = (offset, limit, ownerId) => {
    return connection.getDomainCollection().then(domainModel => {
        return domainModel.find({ownerId: ownerId}, {_id: 0, __v: 0}).skip(offset).limit(limit).then(domainsList => {
            if(domainsList.length > 0){
                return domainsList
            }else {
                return null;
            }
        })
    })
}

// update a domain query
domainDB.updateDomain = (newDomainData, domainId) => {
    return connection.getDomainCollection().then(domainModel => {
        return domainModel.updateOne({domainId: domainId}, newDomainData, {upsert: true}).then(updateResult => {
            if(updateResult.matchedCount == 0){
                return null;
            }else {
                return true ;
            }
        })
    })
}

// fuzzy search query
domainDB.search = (searchQuery) => {
    return connection.getDomainCollection().then(domainModel => {
        return domainModel.fuzzySearch(searchQuery).then(foundDomains => {
            console.log(foundDomains, "found domains");
            if(foundDomains.length >0){
                return foundDomains
            }else {
                return null;
            }
        })
    })
}







module.exports = domainDB;