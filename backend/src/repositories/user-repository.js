//the thing that actually interacts w/the db - we could put this stuff all inside the api controller but no... want single responsibility for each and responsibility of api controller should be to just receive request and send response back
//since this is a user repository that means it's purpose is to interact w/the db aroudn all things users..... which includes queries where we're looking not just at users but information related to users (i.e. behaviors, partners)
const pool = require('../pool')
const toCamelCase = require('../utils/to-camel-case') //function for changing property names from how it's normally stored on dbs style... to how it's normally sent across network style - i.e. report_frequency -> reportFrequency

class UsersRepository {

    static async findAll(){
        const queryResult = await pool.query('SELECT * FROM users') 

        return queryResult.rows
    }

    static async findById(id){
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        //result would be either empty array or a 1 element array like [{id: 1, bio: 'blah', etc}]
        //knowing how we use it in users router... want to just return either null or the element object itself not an array
        return rows[0]
    }

    static async findBhsAndPrtnrsOfAUser(id){
        
        const responseObject = {}

        const queryForPrtnrsWhoMonitorOneOffBhs = await pool.query(
            'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfOneOffBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
        responseObject['prtnrsWhoMonitorOneOffBhs'] = toCamelCase(queryForPrtnrsWhoMonitorOneOffBhs.rows)

        const queryForOneOffBhs = await pool.query(
            'SELECT DISTINCT name, marker FROM (SELECT one_off_behavior_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfOneOffBehaviorsOfUser JOIN one_off_behaviors on one_off_behavior_id = one_off_behaviors.id', [id])
        responseObject['oneOffBhs'] = queryForOneOffBhs.rows 

        const queryForPrtnrsWhoMonitorRepeatedBhs = await pool.query(
            'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfRepeatedBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
        responseObject['prtnrsWhoMonitorRepeatedBhs'] = toCamelCase(queryForPrtnrsWhoMonitorRepeatedBhs.rows)

        const queryForRepeatedBhs = await pool.query(
            'SELECT DISTINCT name, marker, frequency, amount FROM (SELECT repeated_behavior_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfRepeatedBehaviorsOfUser JOIN repeated_behaviors on repeated_behavior_id = repeated_behaviors.id', [id])
        responseObject['repeatedBhs'] = queryForRepeatedBhs.rows 

        return responseObject
    }

    static async findBhsOfAUser(id){
        
        const responseObject = {}

        const queryForOneOffBhs = await pool.query(
            'SELECT DISTINCT name, marker FROM (SELECT one_off_behavior_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfOneOffBehaviorsOfUser JOIN one_off_behaviors on one_off_behavior_id = one_off_behaviors.id', [id])
        responseObject['oneOffBhs'] = queryForOneOffBhs.rows 

        const queryForRepeatedBhs = await pool.query(
            'SELECT DISTINCT name, marker, frequency, amount FROM (SELECT repeated_behavior_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfRepeatedBehaviorsOfUser JOIN repeated_behaviors on repeated_behavior_id = repeated_behaviors.id', [id])
        responseObject['repeatedBhs'] = queryForRepeatedBhs.rows 

        return responseObject
    }

    static async findPrtnrsOfAUser(id){
        
        const responseObject = {}

        const queryForPrtnrsWhoMonitorOneOffBhs = await pool.query(
            'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfOneOffBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
        responseObject['prtnrsWhoMonitorOneOffBhs'] = toCamelCase(queryForPrtnrsWhoMonitorOneOffBhs.rows)

        const queryForPrtnrsWhoMonitorRepeatedBhs = await pool.query(
            'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfRepeatedBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
        responseObject['prtnrsWhoMonitorRepeatedBhs'] = toCamelCase(queryForPrtnrsWhoMonitorRepeatedBhs.rows)

        return responseObject
    }

}

module.exports = UsersRepository