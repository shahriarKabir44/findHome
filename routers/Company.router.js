const CompanyRouter = require('express').Router()
const CompanyRepository = require('../repositories/Company.repository')
const { upload } = require("../utils/fileManager");

const getDirName = require('../public/getDirName')
let path = __dirname.split('/')
path.pop()
path = path.join('/')
CompanyRouter.get('/login', (req, res) => {
    res.sendFile(getDirName() + '/company/login/login.html')
})

CompanyRouter.get('/dashboard', (req, res) => {
    res.sendFile(getDirName() + '/company/dashboard/dashboard.html')
})

CompanyRouter.get('/viewProperty', (req, res) => {
    res.sendFile(getDirName() + '/company/propertyDetails/propertyDetails.html')
})

CompanyRouter.post('/uploadImage', upload.single('file'), (req, res) => {
    let fileURL = req.fileDir + '/' + req.filename
    let id = req.headers.userid
    CompanyRepository.update({ id: id, image: fileURL })
    res.send({ fileURL })
})
CompanyRouter.post('/register', (req, res) => {
    CompanyRepository.register(req.body)
        .then(id => {
            res.send({ id })
        })
})
CompanyRouter.get('/searchById/:id', (req, res) => {
    CompanyRepository.searchById(req.params)
        .then(company => {
            res.send({ company })
        })
})
CompanyRouter.get('/getCompanyList/:pageNumber', (req, res) => {
    CompanyRepository.getCompanyList(req.params)
        .then(companies => {
            res.send({ companies })
        })
})
CompanyRouter.post('/authenticate', (req, res) => {
    CompanyRepository.authenticate(req.body)
        .then(({ company, token }) => {
            res.send({ company, token })
        })
})

CompanyRouter.post('/update', (req, res) => {

    CompanyRepository.update(req.body)
        .then(() => {
            res.send({ success: true })
        })
})

CompanyRouter.get('/getOwnedProperties/:companyId', (req, res) => {
    CompanyRepository.getOwnedProperties(req.params)
        .then(properties => {
            res.send(properties)
        })
})

CompanyRouter.get('/getOwnedPropertiesForDisplay/:companyId', (req, res) => {
    CompanyRepository.getOwnedPropertiesForDisplay(req.params)
        .then(properties => {
            res.send(properties)
        })
})

CompanyRouter.post('/updateProhibition', (req, res) => {
    CompanyRepository.updateProhibition(req.body)
        .then(() => {
            res.send({ success: true })
        })
})

CompanyRouter.get('/isAuthorized', async (req, res) => {
    CompanyRepository.authorize(req)
        .then(info => {
            res.send(info)
        })
})

module.exports = CompanyRouter