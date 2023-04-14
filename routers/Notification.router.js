const NotificationRouter = require('express').Router()
const NotificationRepository = require('../repositories/Notification.repository')

NotificationRouter.post('/create', (req, res) => {
    NotificationRepository.creqate(req.body)
        .then(() => {
            res.send({ success: true });
        })
})

NotificationRouter.post('/getnotifications', (req, res) => {
    NotificationRepository.getnotifications(req.body)
        .then((notifications) => {
            res.send(notifications);
        })
})

module.exports = NotificationRouter