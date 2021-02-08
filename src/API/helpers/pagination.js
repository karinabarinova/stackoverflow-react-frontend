const { Op, Sequelize } = require('sequelize')
const db = require('../helpers/db');


const paginate = async (model, pageSize, pageLimit, search = {}, filter1 = {}, filter2 = {}, filterStatus = {}, order = {}, transform) => {
    try {
        const limit = parseInt(pageLimit, 10) || 15
        const page = parseInt(pageSize, 10) || 1

        let options = {
            offset: getOffset(page, limit),
            limit,
            where: {
                status: ["active", "inactive"]
            }   
        }

        if (filter2 && filter2.length && filter2[0][0] === 'category') {
            options.include = [{
                model: db.Category,
                as: 'categories',
                where: {title: filter2[0][1]},
                attributes: []
            }]
        }
            
        if (filter1 && filter1.length)
            options.where.createdAt = {[Op.between]: [filter1[0][0], filter1[0][1]]}
        if (filterStatus && filterStatus.length)
            options.where.status = filterStatus

        if (Object.keys(search).length)
            options = {options, ...search}

        if (order && order.length)
            options['order'] = order

        let {count, rows} = await model.findAndCountAll(options)

        if (transform && typeof transform === 'function')
            rows = await transform(rows)

        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            pages: getTotalPages(count, limit),
            limit,
            filter1,
            filter2,
            data: rows
        }
    } catch (e) {
        throw 'Internal Server Error'
    }
}

const getTotalPages = (count, limit) => {
    let pages = Math.trunc(count / limit)
    if (count % limit > 0)
        pages++
    return pages
}

const getOffset = (page, limit) => {
    return (page * limit) - limit
}

const getNextPage = (page, limit, total) => {

    if ((total / limit) > page)
        return page + 1;
    return null
}

const getPreviousPage = (page) => {
    if (page <= 1)
        return null
    return page - 1
}
module.exports = paginate
