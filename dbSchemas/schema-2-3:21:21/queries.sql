
-- QUERY1: getting all behaviors and partners of a specific user

-- -- Appraoch1: the worse approach - getting the partners and behaviors together in one query
-- -- get all the 1 off behaviors and partners that monitor those behaviors for that user (downside is if multiple partners monitor one behavior.... that same behavior will be returned in join table multiple times.... I guess way to avoid this would be to divide it into multiple queries) -> I actually need these behaviors because I have to show which behaviors a partner is monitoring
-- SELECT relationship, email, report_frequency, status, name, marker
-- FROM (SELECT *
-- FROM (SELECT * 
-- FROM one_off_behaviors_users_partners
-- WHERE user_id = 1) as bhsUsersPrtnrs
-- JOIN partners ON partner_id = partners.id) as bhsUsersPrtnrsWithPrtnrInfo
-- JOIN one_off_behaviors ON one_off_behavior_id = one_off_behaviors.id

-- Appraoch2: the better approach - getting the partners and behaviors separately
-- Pt1: get all partners of user that monitor user's 1 off behaviors
-- -- B4: gets partners but not the bhs they're monitoring which is what we want
-- SELECT relationship, email, report_frequency, status
-- FROM (SELECT partner_id
-- FROM one_off_behaviors_users_partners
-- WHERE user_id = 1) as idOfPartnersOfOneOffBehaviorsOfUser
-- JOIN partners ON partner_id = partners.id
-- -- AFTER: gets partners but not the bhs they're monitoring which is what we want
SELECT relationship, email, report_frequency, status, one_off_behaviors.name
FROM (SELECT one_off_behavior_id, relationship, email, report_frequency, status
FROM (SELECT partner_id, one_off_behavior_id
FROM one_off_behaviors_users_partners
WHERE user_id = 1) as idOfPartnersOfOneOffBehaviorsOfUser
JOIN partners ON partner_id = partners.id) as PartnersOfOneOffBehaviorsOfUserWithoutBehaviorsTheyreMonitoring
JOIN one_off_behaviors ON one_off_behavior_id = one_off_behaviors.id

-- pt2: get all 1 off behaviors of user
-- https://www.sqlbook.com/sql/sql-distinct-how-to-use/
SELECT DISTINCT one_off_behaviors.id, name, marker
FROM (SELECT one_off_behavior_id
FROM one_off_behaviors_users_partners
WHERE user_id = 1) as idOfOneOffBehaviorsOfUser
JOIN one_off_behaviors on one_off_behavior_id = one_off_behaviors.id

-- do the same for repeated bhs 
-- Pt3: get all partners of user that monitor user's repeated behaviors
-- SELECT relationship, email, report_frequency, status
-- FROM (SELECT partner_id
-- FROM repeated_behaviors_users_partners
-- WHERE user_id = 1) as idOfPartnersOfRepeatedBehaviorsOfUser
-- JOIN partners ON partner_id = partners.id
SELECT relationship, email, report_frequency, status, repeated_behaviors.name
FROM (SELECT repeated_behavior_id, relationship, email, report_frequency, status
FROM (SELECT partner_id, repeated_behavior_id
FROM repeated_behaviors_users_partners
WHERE user_id = 1) as idOfPartnersOfRepeatedBehaviorsOfUser
JOIN partners ON partner_id = partners.id) as PartnersOfRepeatedBehaviorsOfUserWithoutBehaviorsTheyreMonitoring
JOIN repeated_behaviors ON repeated_behavior_id = repeated_behaviors.id 

-- pt4: get all repeated behaviors of user
SELECT DISTINCT repeated_behaviors.id, name, marker, frequency, amount
FROM (SELECT repeated_behavior_id
FROM repeated_behaviors_users_partners
WHERE user_id = 1) as idOfRepeatedBehaviorsOfUser
JOIN repeated_behaviors on repeated_behavior_id = repeated_behaviors.id


-- QUERIES BELOW THIS LINE START CHANGING THE DB.... SO YOU MIGHT CONSIDER JUST RESETTING DB BY DELETING IT AND THEN RECREATING IT USING "FAP - financial accountability partner" + "seeding data.sql" FILE 

--pt5: delete a partner of a user
-- first deleting the foreign key references to that partner
UPDATE repeated_behaviors_users_partners 
SET partner_id = null WHERE user_id = 1 AND partner_id = 1

UPDATE one_off_behaviors_users_partners 
SET partner_id = null WHERE user_id = 1 AND partner_id = 1
-- then deleting the partner
DELETE FROM partners WHERE id = 1 RETURNING *




