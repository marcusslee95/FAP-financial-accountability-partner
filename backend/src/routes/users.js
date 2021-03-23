const express = require('express')
const pool = require('../pool')
const UsersRepository = require('../repositories/user-repository')

const router = express.Router()


router.get('/users', async (req, res) => { //marked function as async because any db operation has chance of taking a long time and don't want that process to block app from doing other things
    const users = await UsersRepository.findAll()    

    res.send(users)
})


module.exports = router