const HomeController = require('express').Router()
let path = __dirname.split('/')
path.pop()
path = path.join('/')
HomeController.get('/home', (req, res) => {
    res.sendFile((path + '/public/components/home/index.html'));
})

HomeController.get('/', (req, res) => {
    res.redirect('/home')
})
HomeController.get('/propertyDetails', (req, res) => {
    res.send(fs.readFileSync(path + '/public/components/propertyDetails/propertydetails-sv.html').toString());

})



module.exports = HomeController