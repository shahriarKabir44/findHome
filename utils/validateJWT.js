const jwt = require('jsonwebtoken')

function validateJWT(token, key) {


    if (!token) return null
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, user) => {
            if (err) {
                resolve(null)
            }
            else {

                resolve(user)
            }
        })
    })


}
module.exports = validateJWT