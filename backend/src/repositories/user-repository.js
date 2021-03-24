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

    // static async findBhsAndPrtnrsOfAUser(id){
        
    //     const responseObject = {}

    //     // //B4: gets partners but not the bhs they're monitoring which is what we want
    //     // const queryForPrtnrsWhoMonitorOneOffBhs = await pool.query(
    //     //     'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfOneOffBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
    //     // responseObject['prtnrsWhoMonitorOneOffBhs'] = toCamelCase(queryForPrtnrsWhoMonitorOneOffBhs.rows)
    //     // // AFTER: gets partners but not the bhs they're monitoring which is what we want

    //     const queryForPrtnrsWhoMonitorOneOffBhs = await pool.query(
    //         'SELECT relationship, email, report_frequency, status, one_off_behaviors.name FROM (SELECT one_off_behavior_id, relationship, email, report_frequency, status FROM (SELECT partner_id, one_off_behavior_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfOneOffBehaviorsOfUser JOIN partners ON partner_id = partners.id) as PartnersOfOneOffBehaviorsOfUserWithoutBehaviorsTheyreMonitoring JOIN one_off_behaviors ON one_off_behavior_id = one_off_behaviors.id', [id])
    //     const prtnrsWhoMonitorOneOffBhsWithDuplicates = toCamelCase(queryForPrtnrsWhoMonitorOneOffBhs.rows)
    //     const prtnrsWhoMonitorOneOffBhs = []
    //     prtnrsWhoMonitorOneOffBhsWithDuplicates.forEach((prtnr) => {
    //         const isAlreadyInArr = (arrElement) => arrElement.relationship === prtnr.relationship;
    //         const index = prtnrsWhoMonitorOneOffBhs.findIndex(isAlreadyInArr)
    //         if (index !== -1){ //if partner already has been added
    //             prtnrsWhoMonitorOneOffBhs[index].name = prtnrsWhoMonitorOneOffBhs[index].name + '; ' + prtnr.name
    //         }
    //         else {
    //             prtnrsWhoMonitorOneOffBhs.push(prtnr)
    //         }
    //     })
    //     responseObject['prtnrsWhoMonitorOneOffBhs'] = prtnrsWhoMonitorOneOffBhs

    //     const queryForOneOffBhs = await pool.query(
    //         'SELECT DISTINCT name, marker FROM (SELECT one_off_behavior_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfOneOffBehaviorsOfUser JOIN one_off_behaviors on one_off_behavior_id = one_off_behaviors.id', [id])
    //     responseObject['oneOffBhs'] = queryForOneOffBhs.rows 

    //     // //B4: gets partners but not the bhs they're monitoring which is what we want
    //     // const queryForPrtnrsWhoMonitorRepeatedBhs = await pool.query(
    //     //     'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfRepeatedBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
    //     // responseObject['prtnrsWhoMonitorRepeatedBhs'] = toCamelCase(queryForPrtnrsWhoMonitorRepeatedBhs.rows)
    //     // // AFTER: gets partners but not the bhs they're monitoring which is what we want

    //     const queryForPrtnrsWhoMonitorRepeatedBhs = await pool.query(
    //         'SELECT relationship, email, report_frequency, status, repeated_behaviors.name FROM (SELECT repeated_behavior_id, relationship, email, report_frequency, status FROM (SELECT partner_id, repeated_behavior_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfRepeatedBehaviorsOfUser JOIN partners ON partner_id = partners.id) as PartnersOfRepeatedBehaviorsOfUserWithoutBehaviorsTheyreMonitoring JOIN repeated_behaviors ON repeated_behavior_id = repeated_behaviors.id ', [id])
    //     const prtnrsWhoMonitorRepeatedBhsWithDuplicates = toCamelCase(queryForPrtnrsWhoMonitorRepeatedBhs.rows)
    //     const prtnrsWhoMonitorRepeatedBhs = []
    //     prtnrsWhoMonitorRepeatedBhsWithDuplicates.forEach((prtnr) => {
    //         const isAlreadyInArr = (arrElement) => arrElement.relationship === prtnr.relationship;
    //         const index = prtnrsWhoMonitorRepeatedBhs.findIndex(isAlreadyInArr)
    //         if (index !== -1){ //if partner already has been added
    //             prtnrsWhoMonitorRepeatedBhs[index].name = prtnrsWhoMonitorRepeatedBhs[index].name + '; ' + prtnr.name
    //         }
    //         else {
    //             prtnrsWhoMonitorRepeatedBhs.push(prtnr)
    //         }
    //     })
    //     responseObject['prtnrsWhoMonitorRepeatedBhs'] = prtnrsWhoMonitorRepeatedBhs


    //     const queryForRepeatedBhs = await pool.query(
    //         'SELECT DISTINCT name, marker, frequency, amount FROM (SELECT repeated_behavior_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfRepeatedBehaviorsOfUser JOIN repeated_behaviors on repeated_behavior_id = repeated_behaviors.id', [id])
    //     responseObject['repeatedBhs'] = queryForRepeatedBhs.rows 

    //     return responseObject
    // }

    static async findBhsOfAUser(id){
        
        const responseObject = {}

        const queryForOneOffBhs = await pool.query(
            'SELECT DISTINCT one_off_behaviors.id, name, marker FROM (SELECT one_off_behavior_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfOneOffBehaviorsOfUser JOIN one_off_behaviors on one_off_behavior_id = one_off_behaviors.id', [id])
        responseObject['oneOffBhs'] = queryForOneOffBhs.rows 

        const queryForRepeatedBhs = await pool.query(
            'SELECT DISTINCT repeated_behaviors.id, name, marker, frequency, amount FROM (SELECT repeated_behavior_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfRepeatedBehaviorsOfUser JOIN repeated_behaviors on repeated_behavior_id = repeated_behaviors.id', [id])
        responseObject['repeatedBhs'] = queryForRepeatedBhs.rows 

        return responseObject
    }

    static async findPrtnrsOfAUser(id){
        
        const responseObject = {}

        // //B4: gets partners but not the bhs they're monitoring which is what we want
        // const queryForPrtnrsWhoMonitorOneOffBhs = await pool.query(
        //     'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfOneOffBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
        // responseObject['prtnrsWhoMonitorOneOffBhs'] = toCamelCase(queryForPrtnrsWhoMonitorOneOffBhs.rows)
        // // AFTER: gets partners but not the bhs they're monitoring which is what we want

        const queryForPrtnrsWhoMonitorOneOffBhs = await pool.query(
            'SELECT partner_id, relationship, email, report_frequency, status, one_off_behaviors.name FROM (SELECT partner_id, one_off_behavior_id, relationship, email, report_frequency, status FROM (SELECT partner_id, one_off_behavior_id FROM one_off_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfOneOffBehaviorsOfUser JOIN partners ON partner_id = partners.id) as PartnersOfOneOffBehaviorsOfUserWithoutBehaviorsTheyreMonitoring JOIN one_off_behaviors ON one_off_behavior_id = one_off_behaviors.id', [id])
        // responseObject['prtnrsWhoMonitorOneOffBhs'] = toCamelCase(queryForPrtnrsWhoMonitorOneOffBhs.rows)
        const prtnrsWhoMonitorOneOffBhsWithDuplicates = toCamelCase(queryForPrtnrsWhoMonitorOneOffBhs.rows)

        //In order to get the multiple bhs a partner is monitoring....
        //1, create empty arrays for distinct partners
        //2. copy over distinct partners 
        //3. whenever we detect duplicate partner just add the behavior to the object of that partner that already exists in copy
        const prtnrsWhoMonitorOneOffBhs = []
        prtnrsWhoMonitorOneOffBhsWithDuplicates.forEach((prtnr) => {
            const isAlreadyInArr = (arrElement) => arrElement.relationship === prtnr.relationship;
            const index = prtnrsWhoMonitorOneOffBhs.findIndex(isAlreadyInArr)
            if (index !== -1){ //if partner already has been added
                prtnrsWhoMonitorOneOffBhs[index].name = prtnrsWhoMonitorOneOffBhs[index].name + '; ' + prtnr.name
            }
            else {
                prtnrsWhoMonitorOneOffBhs.push(prtnr)
            }
        })
        responseObject['prtnrsWhoMonitorOneOffBhs'] = prtnrsWhoMonitorOneOffBhs

        // //B4: gets partners but not the bhs they're monitoring which is what we want
        // const queryForPrtnrsWhoMonitorRepeatedBhs = await pool.query(
        //     'SELECT relationship, email, report_frequency, status FROM (SELECT partner_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfRepeatedBehaviorsOfUser JOIN partners ON partner_id = partners.id', [id])
        // responseObject['prtnrsWhoMonitorRepeatedBhs'] = toCamelCase(queryForPrtnrsWhoMonitorRepeatedBhs.rows)
        // // AFTER: gets partners but not the bhs they're monitoring which is what we want

        const queryForPrtnrsWhoMonitorRepeatedBhs = await pool.query(
            'SELECT partner_id, relationship, email, report_frequency, status, repeated_behaviors.name FROM (SELECT partner_id, repeated_behavior_id, relationship, email, report_frequency, status FROM (SELECT partner_id, repeated_behavior_id FROM repeated_behaviors_users_partners WHERE user_id = $1) as idOfPartnersOfRepeatedBehaviorsOfUser JOIN partners ON partner_id = partners.id) as PartnersOfRepeatedBehaviorsOfUserWithoutBehaviorsTheyreMonitoring JOIN repeated_behaviors ON repeated_behavior_id = repeated_behaviors.id ', [id])
        // responseObject['prtnrsWhoMonitorRepeatedBhs'] = toCamelCase(queryForPrtnrsWhoMonitorRepeatedBhs.rows)
        const prtnrsWhoMonitorRepeatedBhsWithDuplicates = toCamelCase(queryForPrtnrsWhoMonitorRepeatedBhs.rows)

        const prtnrsWhoMonitorRepeatedBhs = []
        prtnrsWhoMonitorRepeatedBhsWithDuplicates.forEach((prtnr) => {
            const isAlreadyInArr = (arrElement) => arrElement.relationship === prtnr.relationship;
            const index = prtnrsWhoMonitorRepeatedBhs.findIndex(isAlreadyInArr)
            if (index !== -1){ //if partner already has been added
                prtnrsWhoMonitorRepeatedBhs[index].name = prtnrsWhoMonitorRepeatedBhs[index].name + '; ' + prtnr.name
            }
            else {
                prtnrsWhoMonitorRepeatedBhs.push(prtnr)
            }
        })

        responseObject['prtnrsWhoMonitorRepeatedBhs'] = prtnrsWhoMonitorRepeatedBhs

        return responseObject
    }

    static async deletePrtnrOfUser(id, partnerId){
        // console.log(id, partnerId)
        // 1. need to delete all foreign key references (which are in the 2 bridge tables) before you are able to delete the partner -> sql doesn't let you to refer to something that doesn't exist
        await pool.query('UPDATE repeated_behaviors_users_partners SET partner_id = null WHERE user_id = $1 AND partner_id = $2', [id, partnerId])
        await pool.query('UPDATE one_off_behaviors_users_partners SET partner_id = null WHERE user_id = $1 AND partner_id = $2', [id, partnerId])
        // 2. actually deleting the partner
        const { rows } = await pool.query('DELETE FROM partners WHERE id = $1 RETURNING *', [partnerId])
        return rows[0]
    }

    static async getPrtnrOfUser(partnerId){
        const { rows } = await pool.query('SELECT * FROM partners WHERE id = $1', [partnerId])
        return rows[0]
    }

    static async deleteOneOffBhOfUser(userId, behaviorId){
        //1. need to delete all bridge table rows of that behavior
        const queryResult = await pool.query('DELETE FROM one_off_behaviors_users_partners WHERE user_id = $1 AND one_off_behavior_id = $2 RETURNING partner_id', [userId, behaviorId])
        //2. we might have just deleted the last behavior some partner was monitoring -> if we did... we want to delete that partner because no need to have accountability partner to monitor no behavior -> how to know when partners no longer monitor any behaviors... 
            //You'll know when the partner no longer makes any appearances in either of the two bridge tables
            //1st: find which partners were monitoring the behavior we just deleted - other partners we know are guaranteed to be monitoring some behavior so no need to consider deleting them whereas partners who's behavior we just deleted.... that might have been the last behavior they monitored
            //2nd: check both bridge tables to see if those partners from step 1 have 0 occurrences in both tables.... if so it means they aren't monitoring anything 
            //3rd: go ahead and delete those partners from the partners table
        const idsOfPrtnrsWhoMonitoredBhWeJustDeletedSoTheresChanceThesePrtnrsNoLongerMonitorAnyBhs = queryResult.rows // [ { partner_id: 2 }, { partner_id: 3 } ]
        // console.log(idsOfPrtnrsWhoMonitoredBhWeJustDeletedSoTheresChanceThesePrtnrsNoLongerMonitorAnyBhs) 
        idsOfPrtnrsWhoMonitoredBhWeJustDeletedSoTheresChanceThesePrtnrsNoLongerMonitorAnyBhs.forEach( async (id) => {
            const actualPartnerId = id.partner_id
            const queryToSeeIfPrtnrMonitorsAnyOneOffBhs = await pool.query('SELECT * FROM one_off_behaviors_users_partners WHERE partner_id = $1', [actualPartnerId])
            console.log(queryToSeeIfPrtnrMonitorsAnyOneOffBhs.rows)
            const queryToSeeIfPrtnrMonitorsAnyRepeatedBhs = await pool.query('SELECT * FROM repeated_behaviors_users_partners WHERE partner_id = $1', [actualPartnerId])
            console.log(queryToSeeIfPrtnrMonitorsAnyRepeatedBhs.rows)

            if (queryToSeeIfPrtnrMonitorsAnyOneOffBhs.rows.length === 0 && queryToSeeIfPrtnrMonitorsAnyRepeatedBhs.rows.length === 0 ){ //this partner no longer monitors any behaviors so we should delete them
                await pool.query('DELETE FROM partners WHERE id = $1', [actualPartnerId])
            }
        })
  
        // 3. actually deleting the behavior
        const queryToDeleteTheBh = await pool.query('DELETE FROM one_off_behaviors WHERE id = $1 RETURNING *', [behaviorId])
        console.log(queryToDeleteTheBh.rows)
        return queryToDeleteTheBh.rows[0]
    }

    static async deleteRepeatedBhOfUser(userId, behaviorId){
        const queryResult = await pool.query('DELETE FROM repeated_behaviors_users_partners WHERE user_id = $1 AND repeated_behavior_id = $2 RETURNING partner_id', [userId, behaviorId])

        const idsOfPrtnrsWhoMonitoredBhWeJustDeletedSoTheresChanceThesePrtnrsNoLongerMonitorAnyBhs = queryResult.rows // [ { partner_id: 2 }, { partner_id: 3 } ]
        // console.log(idsOfPrtnrsWhoMonitoredBhWeJustDeletedSoTheresChanceThesePrtnrsNoLongerMonitorAnyBhs) 
        idsOfPrtnrsWhoMonitoredBhWeJustDeletedSoTheresChanceThesePrtnrsNoLongerMonitorAnyBhs.forEach( async (id) => {
            const actualPartnerId = id.partner_id
            const queryToSeeIfPrtnrMonitorsAnyOneOffBhs = await pool.query('SELECT * FROM one_off_behaviors_users_partners WHERE partner_id = $1', [actualPartnerId])
            console.log(queryToSeeIfPrtnrMonitorsAnyOneOffBhs.rows)
            const queryToSeeIfPrtnrMonitorsAnyRepeatedBhs = await pool.query('SELECT * FROM repeated_behaviors_users_partners WHERE partner_id = $1', [actualPartnerId])
            console.log(queryToSeeIfPrtnrMonitorsAnyRepeatedBhs.rows)

            if (queryToSeeIfPrtnrMonitorsAnyOneOffBhs.rows.length === 0 && queryToSeeIfPrtnrMonitorsAnyRepeatedBhs.rows.length === 0 ){ //this partner no longer monitors any behaviors so we should delete them
                await pool.query('DELETE FROM partners WHERE id = $1', [actualPartnerId])
            }
        })
  
        // 3. actually deleting the behavior
        const queryToDeleteTheBh = await pool.query('DELETE FROM repeated_behaviors WHERE id = $1 RETURNING *', [behaviorId])
        console.log(queryToDeleteTheBh.rows)
        return queryToDeleteTheBh.rows[0]
    }



}

module.exports = UsersRepository