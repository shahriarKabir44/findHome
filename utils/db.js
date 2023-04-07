const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DBPASSWORD,
    database: 'findhome',
    port: 3306
})

module.exports = connection