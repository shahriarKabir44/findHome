const UserRepository = require('../repositories/User.reposotory')
const validateJWT = require('../utils/validateJWT')
const UserRouter = require('express').Router()

const { upload } = require('../utils/fileManager')
UserRouter.get('/findUser/:id', (req, res) => {
    console.log(req.params)
    try {
        UserRepository.findUser(req.params)
            .then(user => {
                res.send(user)
            })
    } catch (error) {
        res.send({ user: null })
    }

})

UserRouter.post('/uploadProfilePicture', upload.single('file'), (req, res) => {
    let fileURL = req.fileDir + '/' + req.filename
    res.send({ fileURL })
})

UserRouter.post('/authenticate', (req, res) => {
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
UserRouter.get('/isAuthorized', async (req, res) => {
    let user = await validateJWT(req.headers['token'], process.env.jwtSecretUser)
    res.send({ user })
})
UserRouter.post('/setProfileImage', (req, res) => {
    UserRepository.setProfileImage(req.body)
        .then(id => {
            res.send({ success: true })
        })
})

UserRouter.post('/update', (req, res) => {
    UserRepository.update(req.body)
        .then((data) => {
            res.send(data)
        })
})

module.exports = UserRouter