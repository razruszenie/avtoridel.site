const paginate = function(page){

    if (!page) { page = 1;}

    return {
        page: parseInt(page, 10),
        limit: 10
    }

}

module.exports = paginate