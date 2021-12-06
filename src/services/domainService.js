const domainDB = require("../models/domainDB")
const utilities = require("../utilities/utilities");
const { v4: uuidv4 } = require('uuid');
const domainService = {}

// service to create a new domain
domainService.createDomain = (domainObject)=>{
    let domainId = uuidv4();
    return domainDB.addDomain({...domainObject, domainId}).then(addedDomain => {
        
        if(addedDomain){
            return addedDomain
        }else{
            let err = new Error('Could Not Add Domain');
            err.status = 500
            throw err
        }
    })

}
// Service to get all domains from the collection - with pagination
domainService.getAllDomains = (page, size)=>{
    let {offset, limit} = utilities.getPagination(page, size);
    return domainDB.getAllDomains(offset, limit).then(domainsList=>{
        if(domainsList){
            return domainsList
        }else{
            let err = new Error('There are no domains')
            err.status = 500
            throw err
        }
    })
}

// Service to get all domains of a specific owner - with pagination
domainService.getDomainsByOwner = (page, size, ownerId)=>{
    let {offset, limit} = utilities.getPagination(page, size);
    return domainDB.getDomainsByOwner(offset, limit, ownerId).then(domainsList=>{
        if(domainsList){
            return domainsList
        }else{
            let err = new Error('There are no domains')
            err.status = 500
            throw err
        }
    })
}

// Service to update a domain using unique domainId
domainService.updateDomain = (newDomainData, domainId)=>{ 
    return domainDB.updateDomain(newDomainData, domainId).then(updatedDomain=>{
        if(updatedDomain){
            return updatedDomain
        }else{
            let err = new Error('There are no domains')
            err.status = 500
            throw err
        }
    })
}

// Service to fuzzy search for domains
domainService.search = (searchQuery)=>{ 
    return domainDB.search(searchQuery).then(foundDomains=>{
        if(foundDomains){
            return foundDomains
        }else{
            let err = new Error('There are no domains')
            err.status = 500
            throw err
        }
    })
}

module.exports = domainService