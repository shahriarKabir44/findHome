const UserRepository = require('../repositories/User.reposotory')

const UserRouter = require('express').Router()

const { upload } = require('../utils/fileManager')
UserRouter.get('/findUser/:id', (req, res) => {
    UserRepository.findUser(req.params)
        .then(user => {
            res.send({ user })
        })
})

UserRouter.post('/uploadProfilePicture', upload.single('file'), (req, res) => {
    let fileURL = req.fileDir + '/' + req.filename
    res.send({ fileURL })
})

UserRouter.post('/login', (req, res) => {
    UserRepository.authenticateUser(req.body)
        .then(({ user, token }) => {
            res.send({ user, token })
        })
})

UserRouter.post('/register', (req, res) => {
    UserRepository.register(req.body)
        .then(id => {
            res.send({ newId: id })
        })
})

UserRouter.post('/setProfileImage', (req, res) => {
    UserRepository.setProfileImage(req.body)
        .then(id => {
            res.send({ success: true })
        })
})

module.exports = UserRouter