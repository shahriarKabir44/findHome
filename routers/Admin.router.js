const AdminRouter = require('express').Router()
const AdminRepository = require('../repositories/Admin.repository')


AdminRouter.post('/authenticate', (req, res) => {
    AdminRepository.authenticate(req.body)
        .then(({ admin, token }) => {
            res.send({ admin, token })
        })
})


module.exports = AdminRouter