const promisify = require('../utils/promisify')
const { createInsertQuery, createUpdateQuery } = require('../utils/queryBuilder')
const CompanyRepository = require('./Company.repository')

module.exports = class PropertyRepository {
    static async create({ sellerId, location, price, area, numBeds, numBath, info, phase, type }) {
        let { isProhibited } = await CompanyRepository.searchById({ id: sellerId })
        if (isProhibited) return null
        await promisify({
            sql: createInsertQuery('property', ['sellerId', 'location', 'price', 'area', 'numBeds', 'numBath', 'info', 'phase', 'type']),
            values: [sellerId, location, price, area, numBeds, numBath, info, phase, type]
        })
        let [{ id }] = await promisify({
            sql: `select max(id) as id from property
                where sellerId=?;`,
            values: [sellerId]
        })
        return id
    }
    static async getCompanyInfo({ propertyId }) {
        let [company] = await promisify({
            sql: `SELECT company.id,company.name,company.location,company.image,company.phoneNumbers,company.email
                from company, property
                where
                    property.id = ?
                    and company.id = property.sellerId;`,
            values: [propertyId]
        })
        company.password = null
        return company
    }
    static async getProperties() {
        return promisify({
            sql: `select property.id ,property.images,property.location,property.price,
                property.newOwner,property.area, property.numBeds,property.numBath,property.info,property.phase,
                property.type, company.name as companyName from property,company 
                where property.sellerId=company.id and  isnull(newOwner);`

        })
    }

    static async getUserOwnedProperties({ userId }) {
        return promisify({
            sql: `select property.id ,property.images,property.location,property.price,
                property.newOwner,property.area, property.numBeds,property.numBath,property.info,property.phase,
                property.type, company.name as companyName from property,company 
                where property.sellerId=company.id and newOwner=?;`,
            values: [userId]
        })
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

    static async filter({ location, phase, price, type }) {

        let filterquery = []
        let values = []
        if (location != '') {
            filterquery.push(`property.location=? `);
            values.push(location)
        }
        if (phase != '') {
            filterquery.push(`property.phase=? `);
            values.push(phase)
        }
        if (type != '') {
            filterquery.push(`property.type=? `);
            values.push(type)
        }
        if (price != '') {
            let range = price.split('-')
            filterquery.push(`property.price >=? and property.price <=? `);
            values = [...values, ...range]
        }
        let sql = filterquery.length ? ` select property.id ,property.images,property.location,property.price,
                property.newOwner,property.area, property.numBeds,property.numBath,property.info,property.phase,
                property.type, company.name as companyName from property,company 
                where property.sellerId=company.id and   ${filterquery.join(' and ')};` : `select * from property;`
        return promisify({
            sql,
            values
        })
    }


    static async update({ id, images, newOwner, location, price, area, numBeds, numBath, info, phase, type }) {
        let fields = []
        let fieldNames = []
        if (location) {
            fields.push(location)
            fieldNames.push('property.location')
        }
        if (price) {
            fields.push(price)
            fieldNames.push('property.price')
        }
        if (images) {
            fields.push(images)
            fieldNames.push('property.images')
        }
        if (newOwner) {
            fields.push(newOwner)
            fieldNames.push('property.newOwner')
        }
        if (area) {
            fields.push(area)
            fieldNames.push('property.area')
        }
        if (numBeds) {
            fields.push(numBeds)
            fieldNames.push('property.numBeds')
        }
        if (numBath) {
            fields.push(numBath)
            fieldNames.push('property.numBath')
        }
        if (info) {
            fields.push(info)
            fieldNames.push('property.info')
        }
        if (phase) {
            fields.push(phase)
            fieldNames.push('property.phase')
        }
        if (type) {
            fields.push(type)
            fieldNames.push('property.type')
        }
        promisify({
            sql: `${createUpdateQuery('property', fieldNames)} where id=?;`,
            values: [...fields, id]
        })
    }

}