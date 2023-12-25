const express = require('express')
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const { initConnection } = require('./utils/db');

const commands = process.argv.filter((item, index) => index > 1)

if (commands[0] == 'dev') {
    require('dotenv').config({ path: `${__dirname}/.env.dev` })

}

if (cluster.isMaster) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });

} else {
    startExpress();
}


function startExpress() {

    let app = express()
    initConnection(process.env)


    app.use(express.json())
    app.use(require('cors')())
    app.use(express.static('public'))
    app.use('/user', require('./routers/User.router'))
    app.use('/property', require('./routers/Property.router'))
    app.use('/notification', require('./routers/Notification.router'))
    app.use('/company', require('./routers/Company.router'))
    app.use('/admin', require('./routers/Admin.router'))
    app.use('/offer', require('./routers/Offer.router'))
    app.use('/transaction', require('./routers/Transaction.router'))
    app.use('/', require('./controllers/Home.Controller'))
    app.get('/test', (req, res) => {
        res.send({ data: 3 })
    })
    app.listen(process.env.PORT || 4000)

}

