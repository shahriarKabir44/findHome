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
OfferRouter.get('/delete/:id', (req, res) => {
    OfferRepository.delete(req.params)
        .then(() => {
            res.send({ success: true })
        })
})

OfferRouter.get('/getPropertyOffers/:propertyId', (req, res) => {
    OfferRepository.getPropertyOffers(req.params)
        .then(offers => {
            res.send(offers)
        })
})

OfferRouter.post('/checkMyOffer', (req, res) => {
    OfferRepository.checkMyOffer(req.body)
        .then(offer => {
            res.send({ offer })
        })
})

module.exports = OfferRouter