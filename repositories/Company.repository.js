const promisify = require('../utils/promisify');
const { createInsertQuery } = require('../utils/queryBuilder')
const jwt = require('jsonwebtoken')

module.exports = class CompanyRepository {
    static async register({ name, location, image, phoneNumbers, email }) {
        await promisify({
            sql: createInsertQuery('company', ['name', 'location', 'image', 'phoneNumbers', 'email']),
            values: [name, location, image, phoneNumbers, email]
        })
        let [{ id }] = await promisify({
            sql: `select id from company
                where email = ? ;`,
            values: [email]
        })
        return id
    }
    static async update({ id, name, location, image, phoneNumbers, email }) {
        let fields = []
        let fieldNames = []
        if (location) {
            fields.push(location)
            fieldNames.push('location')
        }
        if (image) {
            fields.push(image)
            fieldNames.push('image')
        }
        if (phoneNumbers) {
            fields.push(phoneNumbers)
            fieldNames.push('phoneNumbers')
        }
        if (email) {
            fields.push(email)
            fieldNames.push('email')
        }
        if (name) {
            fields.push(name)
            fieldNames.push('name')
        }
        promisify({
            sql: `${createUpdateQuery('company', fieldNames)} where id=?;`,
            values: [id, ...fields]
        })
    }
    static async authenticate({ email, password }) {
        let [company] = await promisify({
            sql: `select id, name, location, image, phoneNumbers, email
                from company where email = ? and password = ? ;`,
            values: [email, password]
        })
        if (company == null) return {
            company: null,
            token: null
        }
        let token = jwt.sign(company, process.env.jwtSecret)
        return { company, token }
    }
}