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
        if (type == 2) {
            return promisify({
                sql: `select * from notification where receiverId = ? and (type=2 or type=3) ;`,
                values: [id, type, pagenumber]
            })
        }
        return promisify({
            sql: `select * from notification where receiverId = ? and type=1  ;`,
            values: [id, type, pagenumber]
        })
    }
}