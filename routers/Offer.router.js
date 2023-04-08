const OfferRepository = require('../repositories/Offer.repository')

const OfferRouter = require('express').Router()

OfferRouter.post('/create', (req, res) => {
    OfferRepository.create(req.body)
        .then(() => {
            res.send({ success: true })
        })
})
OfferRouter.post('/update', (req, res) => {
    OfferRepository.update(req.body)
        .then(() => {
            res.send({ success: true })
        })
})
OfferRouter.post('/delete', (req, res) => {
    OfferRepository.delete(req.body)
        .then(() => {
            res.send({ success: true })
        })
})



module.exports = OfferRouter