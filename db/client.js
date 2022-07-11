const { Client } = require('pg');

const connectionString = 'https://localhost:5432/fitness-dev';


const cn = {
    database: 'example',
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    connectionString: 'https://localhost:5432/fitness-dev'
}


// const client = new Client(
//     cn
// //   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
// );

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'fitness-dev',
    user: 'postgres',
    password: '1234',
})

module.exports = client;
