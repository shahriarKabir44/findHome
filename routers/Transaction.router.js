const TransactionRepository = require('../repositories/Transactions.repository')

const TransactionRouter = require('express').Router()

TransactionRouter.get('/getPropertyTransaction/:propertyId', (req, res) => {
    TransactionRepository.getPropertyTransaction(req.params)
        .then(transaction => {
            res.send(transaction)
        })
})


module.exports = TransactionRouter