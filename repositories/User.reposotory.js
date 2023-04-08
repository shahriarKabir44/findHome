const promisify = require('../utils/promisify')
const { createInsertQuery } = require('../utils/queryBuilder')
const jwt = require('jsonwebtoken')
module.exports = class UserRepository {
    static async findUser({ id }) {
        let [user] = await promisify({
            sql: `select name,email, phone, nationality,gender, occupation, profileImageURL
                from user where id=?;`,
            values: [id]
        })
        return user
    }
    static async register({ name, email, phone, nationality, gender, occupation, password }) {
        await promisify({
            sql: createInsertQuery('user', ['name', 'email', 'phone', 'nationality', 'gender', 'occupation', 'password']),
            values: [name, email, phone, nationality, gender, occupation, password]
        })
        let [{ id }] = await promisify({
            sql: `select id
                from user where email=?;`,
            values: [email]
        })
        return id
    }
    static async setProfileImage({ id, profileImageURL }) {
        promisify({
            sql: `update user set profileImageURL=? where id=?;`,
            values: [profileImageURL, id]
        })
    }
    static async authenticateUser({ email, password }) {
        let [user] = await promisify({
            sql: `select id,name,email, phone, nationality,gender, occupation, profileImageURL
                from user where email=?,password=?;`,
            values: [email, password]
        })
        let token = jwt.sign(user, process.env.jwtSecret)
        return { user, token }
    }
}