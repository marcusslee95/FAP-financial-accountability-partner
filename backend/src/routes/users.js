const express = require('express')
const pool = require('../pool')
const UsersRepository = require('../repositories/user-repository')

const router = express.Router()


router.get('/users', async (req, res) => { //marked function as async because any db operation has chance of taking a long time and don't want that process to block app from doing other things
    const users = await UsersRepository.findAll()    

    res.send(users)
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id

    //B4: if the request came w/query string parameters indicating it's asking for all user's behaviors and partners.... send back that info
    // console.log(req.query)
    const whatWasInQueryString = req.query //https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js
    if (whatWasInQueryString.hasOwnProperty('behaviors') //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        && whatWasInQueryString.hasOwnProperty('partners')) {
        console.log('Im inside')

        //B4: let's check if the user even exists before looking for all their bhs and prtnrs -> would be a waste of load if looked for bhs and prtnrs of nonexistent user
        const user = await UsersRepository.findById(id)
        if (!user){
            res.status(404).send("There's no user w/this id")
            return
        }
        //AFTER: let's check if the user even exists before looking for all their bhs and prtnrs -> would be a waste of load if looked for bhs and prtnrs of nonexistent user

        const allBhsAndPrtnrsOfAUser = await UsersRepository.findAllBhsAndPrtnrsOfAUser(id)
        res.send(allBhsAndPrtnrsOfAUser)
        return
    }
    //AFTER: if the request came w/query string parameters indicating it's asking for all user's behaviors and partners.... send back that info

    //B4: if the request is to just get the users table info back
    const user = await UsersRepository.findById(id)

    //if we got back null we realize there wasn't a user of that id so send them back error status 
    if (user){
        res.send(user)
    }
    else {
        res.sendStatus(404)
    }
    //AFTER: if the request is to just get the users table info back
    
})


module.exports = router