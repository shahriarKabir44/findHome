const promisify = require('../utils/promisify')

const { createInsertQuery, createUpdateQuery } = require('../utils/queryBuilder')


module.exports = class OfferRepository {
    static async create({ offeredBy, propertyId, offer }) {
        let time = (new Date()) * 1
        promisify({
            sql: createInsertQuery('offer', ['offeredBy', 'propertyId', 'offer', 'time']),
            values: [offeredBy, propertyId, offer, time]
        })
    }
    static async update({ offeredBy, propertyId, offer }) {
        let time = (new Date()) * 1
        promisify({
            sql: createUpdateQuery('offer', ['time', 'offer']) + `where 
                offeredBy=? and propertyId=? `,
            values: [time, offer, offeredBy, propertyId]
        })
    }
    static async delete({ propertyId, offeredBy }) {
        promisify({
            sql: `delete from offer where propertyId=? and offeredBy=?;`,
            values: [propertyId, offeredBy]
        })
    }
}