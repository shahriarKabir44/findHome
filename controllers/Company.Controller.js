const CompanyController = require('express').Router()
let path = __dirname.split('/')
path.pop()
path = path.join('/')
CompanyController.get('/login', (req, res) => {
    res.sendFile(path + '/public/company/login/login.html')
})

CompanyController.get('/dashboard', (req, res) => {
    res.sendFile(path + '/public/company/dashboard/dashboard.html')
})

module.exports = CompanyController