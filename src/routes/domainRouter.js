const express = require('express');
const router = express.Router();
const domainService = require("../services/domainService")

// Route to get all domains GET - /domain/ 
router.get('/', function (req, res, next) {
    console.log("inside get route");
    let { page, size } = req.body;
    domainService.getAllDomains(page, size)
        .then(domainsList => {
            res.json({ data: domainsList });
        })
        .catch(error => {
            next(error);
        })
})

// Route to get all domains of a specific owner - GET - /domain/byOwner/:ownerId
router.get('/byOwner/:ownerId', function (req, res, next) {
    console.log("inside get route by owner");
    let { page, size } = req.body;
    domainService.getDomainsByOwner(page, size, req.params.ownerId)
        .then(domains => {
            res.json({ data: domains });
        })
        .catch(error => {
            next(error);
        })

})

// Route to add a new domain to the collection - POST - /domain/
router.post('/', function (req, res, next) {
    console.log("inside post route");
    domainService.createDomain(req.body)
        .then(addedDomain => {
            res.json({ data: addedDomain, message: "Added successfully" });
        }).catch(error => {
            next(error);
        })

})

// Route to fuzzy search for domain records - POST /domain/search?q=
router.post('/search', function (req, res, next) {
    console.log("inside post route");
    domainService.search(req.query)
        .then(foundDomains => {
            res.json({data: foundDomains})
        }).catch(error => {
            next(error);
        })
  
})

// Route to update a specific domain record - PUT- /domain/:domainId
router.put('/:domainId', function (req, res, next) {
    console.log("inside put route");

    domainService.updateDomain(req.body, req.params.domainId)
        .then(updatedDomain => {
            res.json({message: "Successfully updated"})
        }).catch(error => {
            next(error);
        })


})









module.exports = router;