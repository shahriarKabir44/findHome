const promisify = require('../utils/promisify')
const { createInsertQuery, createUpdateQuery } = require('../utils/queryBuilder')

module.exports = class PropertyRepository {
    static async create({ sellerId, location, price }) {
        await promisify({
            sql: createInsertQuery('property', ['sellerId', 'location', 'price']),
            values: [sellerId, location, price]
        })
        let [{ id }] = await promisify({
            sql: `select max(id) as id from property
                where sellerId=?;`,
            values: [sellerId]
        })
        return id
    }
    static async setPropertyImages({ id, images }) {
        promisify({
            sql: `${createUpdateQuery('property', ['images'])} where id=?;`,
            values: [images, id]
        })
    }
    static async searchPropertybyId({ id }) {
        let [property] = await promisify({
            sql: `select * from property where id=?`,
            values: [id]
        })
        return property
    }
    static async update({ id, location, price, images, newOwner }) {
        let fields = []
        let fieldNames = []
        if (location) {
            fields.push(location)
            fieldNames.push('location')
        }
        if (price) {
            fields.push(price)
            fieldNames.push('price')
        }
        if (images) {
            fields.push(images)
            fieldNames.push('images')
        }
        if (newOwner) {
            fields.push(newOwner)
            fieldNames.push('newOwner')
        }
        promisify({
            sql: `${createUpdateQuery('property', fieldNames)} where id=?;`,
            values: [...fields, id]
        })
    }

}