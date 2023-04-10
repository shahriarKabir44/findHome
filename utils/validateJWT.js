const jwt = require('jsonwebtoken')

module.exports = function (token, key) {


    if (!token) return null

    jwt.verify(token, key, (err, user) => {
        if (err) {
            return null
        }
        else {
            return user
        }
    })

}