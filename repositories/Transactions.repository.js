const promisify = require('../utils/promisify')
const { createInsertQuery } = require('../utils/queryBuilder.js')

module.exports = class TransactionRepository {
    static async create({ purchasedBy, purchasedFrom, propertyId, amount }) {
        const time = (new Date()) * 1
        promisify({
            sql: createInsertQuery('transaction', ['purchasedBy', 'purchasedFrom', 'propertyId', 'amount', 'time']),
            values: [purchasedBy, purchasedFrom, propertyId, amount, time]
        })
    }
    static async getPropertyTransaction({ propertyId }) {
        let [transaction] = await promisify({
            sql: `select user.name,user.email,user.phone, user.id, user.profileImageURL, 
            transaction.amont, transaction.time
            from transaction,user where transaction.propertyId = ? and
            transaction.purchasedBy=user.id;`,
            values: [propertyId]
        })
        return transaction
    }
}