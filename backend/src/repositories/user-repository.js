//the thing that actually interacts w/the db - we could put this stuff all inside the api controller but no... want single responsibility for each and responsibility of api controller should be to just receive request and send response back
//since this is a user repository that means it's purpose is to interact w/the db aroudn all things users..... which includes queries where we're looking not just at users but information related to users (i.e. behaviors, partners)
const pool = require('../pool')

class UsersRepository {

    static async findAll(){
        const queryResult = await pool.query('SELECT * FROM users') 

        return queryResult.rows
    }

}

module.exports = UsersRepository