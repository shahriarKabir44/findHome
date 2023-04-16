const HomeController = require('express').Router()
const getDirName = require('../public/getDirName')
let path = __dirname.split('/')
path.pop()
path = path.join('/')
HomeController.get('/home', (req, res) => {
    res.sendFile((getDirName() + '/components/home/index.html'));
})

HomeController.get('/search', (req, res) => {
    res.sendFile((getDirName() + '/components/propertyListPage/property-list.html'));

})
HomeController.get('/interior', (req, res) => {
    res.sendFile((getDirName() + '/components/interior/interior.html'));

})
HomeController.get('/construction', (req, res) => {
    res.sendFile((getDirName() + '/components/construction/construction.html'));

})
HomeController.get('/userProfile', (req, res) => {
    res.sendFile(getDirName() + '/components/userProfile/userProfile.html')

})

HomeController.get('/', (req, res) => {
    res.redirect('/home')
})
HomeController.get('/propertyDetails', (req, res) => {
    res.sendFile(getDirName() + '/components/propertyDetails/propertydetails-sv.html')

})

HomeController.get('/viewCompany', (req, res) => {
    res.sendFile(getDirName() + '/components/company/company.html')

})

module.exports = HomeController