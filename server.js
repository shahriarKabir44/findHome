const express = require('express')
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const connection = require('./utils/db')
require('dotenv').config()
connection.connect()
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

    app.use('/user', require('./routers/User.router'))
    app.use('/property', require('./routers/Property.router'))
    app.use('/notification', require('./routers/Notification.router'))
    app.use('/company',require('./routers/Company.router'))
    app.listen(process.env.PORT || 4000)

}

