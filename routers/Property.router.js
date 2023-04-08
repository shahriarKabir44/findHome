const PropertyRouter = require('express').Router()
const { upload } = require('../utils/fileManager')
const PropertyRepository = require('../repositories/Property.repository')

PropertyRouter.get('/searchPropertybyId/:id', (req, res) => {
    PropertyRepository.searchPropertybyId(req.params)
        .then(property => {
            res.send({ property })
        })
})

PropertyRouter.post('/uploadPropertyImage', upload.single('file'), (req, res) => {
    let fileURL = req.fileDir + '/' + req.filename

    res.send({ fileURL })
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
module.exports = PropertyRouter