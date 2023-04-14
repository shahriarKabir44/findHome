const HomeController = require('express').Router()
let path = __dirname.split('/')
path.pop()
path = path.join('/')
HomeController.get('/home', (req, res) => {
    res.sendFile((path + '/public/components/home/index.html'));
})

HomeController.get('/search', (req, res) => {
    res.sendFile((path + '/public/components/propertyListPage/property-list.html'));

})
HomeController.get('/interior', (req, res) => {
    res.sendFile((path + '/public/components/interior/interior.html'));

})
HomeController.get('/construction', (req, res) => {
    res.sendFile((path + '/public/components/construction/construction.html'));

})
HomeController.get('/userProfile', (req, res) => {
    res.sendFile(path + '/public/components/userProfile/userProfile.html')

})

HomeController.get('/', (req, res) => {
    res.redirect('/home')
})
HomeController.get('/propertyDetails', (req, res) => {
    res.sendFile(path + '/public/components/propertyDetails/propertydetails-sv.html')

})

HomeController.get('/viewCompany', (req, res) => {
    res.sendFile(path + '/public/components/company/company.html')

})

module.exports = HomeController