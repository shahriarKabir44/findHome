const promisify = require('../utils/promisify')
const { createInsertQuery } = require('../utils/queryBuilder')

module.exports = class NotificationRepository {
    static async create({ body, senderId, receiverId, type }) {
        let time = (new Date()) * 1
        await promisify({
            sql: createInsertQuery('notification', ['body', 'senderId', 'receiverId', 'time', 'type']),
            values: [body, senderId, receiverId, time, type]
        })

    }
    static async getnotifications({ id, pagenumber }) {
        return promisify({
            sql: `select * from notifications where receiverId = ? limit ?,10`,
            values: [id, pagenumber]
        })
    }
}