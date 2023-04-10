const promisify = require('../utils/promisify')
const jwt = require('jsonwebtoken')
module.exports = class AdminRepository {
    static async authenticate({ email, password }) {
        let [admin] = await promisify({
            sql: `select * from admin where email=? and password=?;`,
            values: [email, password]
        })


        if (!admin) return {
            admin: null,
            token: null
        }
        admin.password = null
        let token = jwt.sign({ ...admin, type: "admin" }, process.env.jwtSecretAdmin)
        return { admin, token }
    }

}