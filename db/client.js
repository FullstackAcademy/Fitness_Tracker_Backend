const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'fitness-dev',
    user: 'postgres',
    password: '1234',
})

module.exports = client;
