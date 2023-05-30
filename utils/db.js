const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234.',
    database: 'find_home',
    port: 3306
})

module.exports = connection