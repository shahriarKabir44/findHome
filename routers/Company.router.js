const CompanyRouter = require('express').Router()
const CompanyRepository = require('../repositories/Company.repository')
const { upload } = require("../utils/fileManager");

const validateJWT = require('../utils/validateJWT')

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

CompanyRouter.get('/isAuthorized', async (req, res) => {
    let company = await validateJWT(req.headers['token'], process.env.jwtSecretCompany)
    res.send({ 'company': company ? company : null })
})

module.exports = CompanyRouter