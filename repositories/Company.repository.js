const promisify = require('../utils/promisify');
const { createInsertQuery, createUpdateQuery } = require('../utils/queryBuilder')
const jwt = require('jsonwebtoken');
const NotificationRepository = require('./Notification.repository');

module.exports = class CompanyRepository {
    static async register({ name, location, image, phoneNumbers, email, password }) {
        try {
            await promisify({
                sql: createInsertQuery('company', ['name', 'location', 'image', 'phoneNumbers', 'email', 'password']),
                values: [name, location, image, phoneNumbers, email, password]
            })
            let [{ id }] = await promisify({
                sql: `select id from company
                where email = ? ;`,
                values: [email]
            })
            return id
        } catch (error) {
            return null
        }

    }
    static async update({ id, name, location, image, phoneNumbers, email, description }) {
        let fields = []
        let fieldNames = []
        if (location) {
            fields.push(location)
            fieldNames.push('location')
        }
        if (description) {
            fields.push(description)
            fieldNames.push('description')
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
            values: [...fields, id]
        })
    }
    static async authenticate({ email, password }) {
        let [company] = await promisify({
            sql: `select id, name, location, image, phoneNumbers, email,description, isProhibited
                from company where email = ? and password = ? ;`,
            values: [email, password]
        })
        if (company == null) return {
            company: null,
            token: null
        }
        let token = jwt.sign({ ...company, type: "company" }, process.env.jwtSecretCompany)
        return { company, token }
    }
    static async getCompanyList({ pageNumber }) {
        return promisify({
            sql: `select id, name, location, image, phoneNumbers, email, isProhibited
                 from company limit ?,5;`,
            values: [pageNumber * 1]
        })
    }
    static async searchById({ id }) {
        let [company] = await promisify({
            sql: `select * from company where id = ?;`,
            values: [id]
        })
        company.password = null
        return company
    }
    static async updateProhibition({ companyId, status }) {
        if (status) {
            NotificationRepository.create({
                body: `You are prohibited from creating any new property.`,
                type: 3,
                propertyId: null
            })
        }
        else {
            NotificationRepository.create({
                body: `You are now allowed to create new properties.`,
                type: 3,
                propertyId: null
            })
        }
        return promisify({
            sql: `${createUpdateQuery('company', ['isProhibited'])} where id=?`,
            values: [status, companyId]
        })
    }
    static async getOwnedPropertiesForDisplay({ companyId }) {
        return promisify({
            sql: `select * from property
                where property.sellerId = ?; `,
            values: [companyId]
        })
    }


    static async getOwnedProperties({ companyId }) {
        return promisify({
            sql: `select
                    id,
                    images,
                    price,
                    location, (
                        select name
                        from user
                        where
                            id = property.newOwner
                    ) as newOwnerName,
                    (select count(id) from offer where offer.propertyId = property.id)
                        as numOffers
                from property
                where property.sellerId = ?; `,
            values: [companyId]
        })
    }
}