const promisify = require('../utils/promisify')
const { createInsertQuery, createUpdateQuery } = require('../utils/queryBuilder')
const jwt = require('jsonwebtoken')
module.exports = class UserRepository {
    static async findUser({ id }) {
        let [user] = await promisify({
            sql: `select name,email, phone, profileImageURL
                from user where id=?;`,
            values: [id]
        })
        return user
    }
    static async register({ name, email, phone, password }) {
        await promisify({
            sql: createInsertQuery('user', ['name', 'email', 'phone', 'password']),
            values: [name, email, phone, password]
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
    static async update({ name, email, phone, password, id, profileImageURL }) {
        let fields = []
        let filedNames = []
        if (name) {
            fields.push(name)
            filedNames.push('name')
        }
        if (email) {
            fields.push(email)
            filedNames.push('email')
        }
        if (phone) {
            fields.push(phone)
            filedNames.push('phone')
        }
        if (password) {
            fields.push(password)
            filedNames.push('password')
        }
        if (profileImageURL) {
            fields.push(profileImageURL)
            filedNames.push('profileImageURL')
        }
        await promisify({
            sql: createUpdateQuery('user', filedNames) + 'where id=?;',
            values: [...fields, id]
        })

        let user = await UserRepository.findUser({ id })
        return {
            user: user,
            token: jwt.sign({ ...user, type: 'user' }, process.env.jwtSecretUser)
        }

    }
    static async authenticateUser({ email, password }) {
        let [user] = await promisify({
            sql: `select id,name,email, phone,  profileImageURL
                from user where email=? and password=?;`,
            values: [email, password]
        })
        if (!user) {
            return {
                user: null,
                token: null
            }
        }
        let token = jwt.sign(user, process.env.jwtSecretUser)
        return { user, token }
    }
}