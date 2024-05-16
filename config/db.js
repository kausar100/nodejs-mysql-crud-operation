require('dotenv').config();

const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: process.env.DB,
    password: process.env.PASSWORD
});

module.exports = pool;