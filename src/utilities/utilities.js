let utilities = {};
// Get pagination parameters
utilities.getPagination = (page, size) => {
    let pageNumber = Number(page) ? Number(page): 1;
    let limit = Number(size) ? Number(size): 10;
    let offset = (pageNumber-1)*limit;
    
    return {offset, limit};
}

module.exports = utilities;