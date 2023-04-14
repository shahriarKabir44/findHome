const promisify = require('../utils/promisify')

const { createInsertQuery, createUpdateQuery } = require('../utils/queryBuilder')
const PropertyRepository = require('./Property.repository')
const NotificationRepository = require('./Notification.repository')
const UserRepository = require('./User.repository')
const TransactionRepository = require('./Transactions.repository')
module.exports = class OfferRepository {
    static async create({ offeredBy, propertyId, offer, companyId }) {
        let time = (new Date()) * 1
        promisify({
            sql: createInsertQuery('offer', ['offeredBy', 'propertyId', 'offer', 'time']),
            values: [offeredBy, propertyId, offer, time]
        })
        let offerer = await UserRepository.findUser({ id: offeredBy })
        NotificationRepository.create({
            body: `${offerer.name} has offered BDT. ${offer} for your property.`,
            senderId: offeredBy,
            receiverId: companyId,
            propertyId,
            type: 2
        })
    }
    static async checkMyOffer({ offeredBy, propertyId }) {
        let [offer] = await promisify({
            sql: `select * from offer where
                offeredBy = ? and propertyId=?;`,
            values: [offeredBy, propertyId]
        })
        return offer
    }
    static async getPropertyOffers({ propertyId }) {
        return promisify({
            sql: `select user.name, user.email, user.phone, user.profileImageURL,offer.offer
                ,offer.time,offer.id as offerId ,offer.offeredBy from user,offer
                where user.id=offer.offeredBy and offer.propertyId=?;`,
            values: [propertyId]
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
    static async delete({ id }) {
        promisify({
            sql: `delete from offer where id=?;`,
            values: [id]
        })
    }
    static async accept({ offer, property, company }) {
        promisify({
            sql: `delete from offer where offer.propertyId=?;`,
            values: [property.id]
        })
        PropertyRepository.update({ id: property.id, newOwner: offer.offeredBy })
        TransactionRepository.create({
            purchasedBy: offer.offeredBy,
            purchasedFrom: company.id,
            propertyId: property.id,
            amount: offer.offer
        })
        NotificationRepository.create({
            body: `${company.name} has accepted your offer of tk. ${offer.offer}. You are now the owner of the property.`,
            senderId: company.id,
            receiverId: offer.offeredBy,
            type: 1,
            propertyId: property.id
        })
        return 1
    }
}