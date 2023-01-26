const {Pool} = require('pg');

const client = new Pool({
    user: 'Local User',
    hostname: 'localhost',
    port: 5432,
    database: 'pets'
})

module.exports = client;