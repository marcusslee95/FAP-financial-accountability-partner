//used to get server to start listening for requests after we confirm that pool works properly aka. we can interact w/db
const pool = require('./pool')
const createsAndConfiguresServer = require('./app')

const startUpTheServer = async () => {//used this async await version instead of .then version cuz i find it more readable 
    try {
        const queryResult = await pool.query('SELECT * FROM users') //random query to test that pool can interact w/db
        console.log(queryResult.rows)

        //if it hasn't errored by this line you know that pool succesfully interacts w/db so go ahead and start up your server
        createsAndConfiguresServer().listen(4000, () => {
            console.log('Server is up and running')
        })
    }
    catch (e){
        console.log(e)
    }
}

startUpTheServer()


//.then version
// pool.query('SELECT * FROM users') //random query to test that pool can interact w/db
// .then((res) => {
//     console.log('Yo Thing Being Used to interact w/db - aka pool - is working! \nSee here is a column value of the row we are getting back -> \n' + res.rows[0].contents)
//     createsAndConfiguresServer().listen(3333, () => {
//         console.log('Yo server is up & Listening for requests!')
//     })
// })
// .catch((err) => console.error(err))

