const AdminController = require('express').Router()

let path = __dirname.split('/')
path.pop()
path = path.join('/')
AdminController.get('/login', (req, res) => {
    res.sendFile(path + '/public/admin/login/login.html')
})

AdminController.get('/dashboard', (req, res) => {
    res.sendFile(path + '/public/admin/dashboard/dashboard.html')
})


module.exports = AdminController