//creates instance of the server we'll be using for our backend to live in + configures settings of server i.e. what data it receives and sends back - json - and what routers it uses to route requests
const express = require('express')
const sampleRouter = require('./routes/sample')
const usersRouter = require('./routes/users')
const cors = require('cors')

module.exports = () => {
    const app = express()

    app.use(cors()) //https://expressjs.com/en/resources/middleware/cors.html
    app.use(express.json())
    app.use(sampleRouter)
    app.use(usersRouter)
    
    return app

}