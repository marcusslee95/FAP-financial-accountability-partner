//the thing we use to connect and send queries to the db 
const pg = require('pg')

const pool = new pg.Pool({ // connecting to db
    host: 'localhost',
    port: 5432,
    database: 'FAP',
    user: 'marcusslee95',
    password: ''
})

// const someFunc = async () => {
//     const queryResult = await pool.query('SELECT * FROM users')
//     console.log(queryResult.rows)
// }
// someFunc()


module.exports = pool