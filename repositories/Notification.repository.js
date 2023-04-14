const promisify = require('../utils/promisify')
const { createInsertQuery } = require('../utils/queryBuilder')

module.exports = class NotificationRepository {
    static async create({ body, senderId, receiverId, type, propertyId }) {
        let time = (new Date()) * 1
        await promisify({
            sql: createInsertQuery('notification', ['body', 'senderId', 'receiverId', 'time', 'type', 'propertyId']),
            values: [body, senderId, receiverId, time, type, propertyId]
        })

    }
    static async getnotifications({ id, pagenumber, type }) {
        return promisify({
            sql: `select * from notification where receiverId = ? and type=? limit ?,10;`,
            values: [id, type, pagenumber]
        })
    }
}