const AdminRouter = require('express').Router()
const AdminRepository = require('../repositories/Admin.repository')
const validateJWT = require('../utils/validateJWT')

AdminRouter.post('/authenticate', (req, res) => {
    AdminRepository.authenticate(req.body)
        .then(({ admin, token }) => {
            res.send({ admin, token })
        })
})

AdminRouter.get('/isAuthorized', async (req, res) => {
    let admin = await validateJWT(req.headers['token'], process.env.jwtSecretAdmin)
    res.send({ 'admin': admin ? admin : null })
})

module.exports = AdminRouter