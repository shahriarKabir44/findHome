const AdminRouter = require('express').Router()
const AdminRepository = require('../repositories/Admin.repository')
const validateJWT = require('../utils/validateJWT')
let path = __dirname.split('/')
const getDirName = require('../public/getDirName')
path.pop()
path = path.join('/')
AdminRouter.get('/login', (req, res) => {
    res.sendFile(getDirName() + '/admin/login/login.html')
})

AdminRouter.get('/dashboard', (req, res) => {
    res.sendFile(getDirName() + '/admin/dashboard/dashboard.html')
})

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