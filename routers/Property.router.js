const PropertyRouter = require('express').Router()
const { upload } = require('../utils/fileManager')
const PropertyRepository = require('../repositories/Property.repository')
const fs = require('fs')
const getDirName = require('../public/getDirName')
let path = __dirname.split('/')
path.pop()
path = path.join('/')
path += '/public/'
PropertyRouter.get('/searchPropertybyId/:id', (req, res) => {
    PropertyRepository.searchPropertybyId(req.params)
        .then(property => {
            res.send({ property })
        })
})


PropertyRouter.post('/deleteImage', (req, res) => {
    const { image } = req.body
    fs.unlink(getDirName() + '/' + image, (err) => {
        if (err)
            console.log(err)
    })
    res.send({ image })
})

PropertyRouter.get('/getCompanyInfo/:propertyId', (req, res) => {
    PropertyRepository.getCompanyInfo(req.params)
        .then(company => {

            res.send({ company })
        })
})

PropertyRouter.post('/uploadImage', upload.single('file'), (req, res) => {
    let fileURL = req.fileDir + '/' + req.filename
    res.send({ fileURL })
})
PropertyRouter.get('/getProperties', (req, res) => {
    PropertyRepository.getProperties()
        .then(properties => {
            res.send({ properties })
        })
})
PropertyRouter.post('/create', (req, res) => {
    PropertyRepository.create(req.body)
        .then(newId => {
            res.send({ newId })
        })
})
PropertyRouter.post('/update', (req, res) => {
    PropertyRepository.update(req.body)
        .then(() => {
            res.send({ success: true })
        })
})


PropertyRouter.post('/filter', (req, res) => {
    PropertyRepository.filter(req.body)
        .then(properties => {
            res.send(properties)
        })
})

PropertyRouter.get('/getUserOwnedProperties/:userId', (req, res) => {
    PropertyRepository.getUserOwnedProperties(req.params)
        .then(properties => {
            res.send(properties)
        })
})

module.exports = PropertyRouter