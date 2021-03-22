
-- QUERY1: getting all behaviors and partners of a yser given user's id

-- -- Appraoch1: the worse approach - getting the partners and behaviors together in one query
-- -- get all the 1 off behaviors and partners that monitor those behaviors for that user (downside is if multiple partners monitor one behavior.... that same behavior will be returned in join table multiple times.... I guess way to avoid this would be to divide it into multiple queries)
-- SELECT relationship, email, report_frequency, status, name, marker
-- FROM (SELECT *
-- FROM (SELECT * 
-- FROM one_off_behaviors_users_partners
-- WHERE user_id = 1) as bhsUsersPrtnrs
-- JOIN partners ON partner_id = partners.id) as bhsUsersPrtnrsWithPrtnrInfo
-- JOIN one_off_behaviors ON one_off_behavior_id = one_off_behaviors.id

-- Appraoch2: the better approach - getting the partners and behaviors separately
-- Pt1: get all partners of user that monitor user's 1 off behaviors
SELECT relationship, email, report_frequency, status
FROM (SELECT partner_id
FROM one_off_behaviors_users_partners
WHERE user_id = 1) as idOfPartnersOfOneOffBehaviorsOfUser
JOIN partners ON partner_id = partners.id

-- pt2: gett all 1 off behaviors of user
-- https://www.sqlbook.com/sql/sql-distinct-how-to-use/
SELECT DISTINCT name, marker 
FROM (SELECT one_off_behavior_id
FROM one_off_behaviors_users_partners
WHERE user_id = 1) as idOfOneOffBehaviorsOfUser
JOIN one_off_behaviors on one_off_behavior_id = one_off_behaviors.id

-- Pt3: do the same for repeated bhs 
SELECT relationship, email, report_frequency, status
FROM (SELECT partner_id
FROM repeated_behaviors_users_partners
WHERE user_id = 1) as idOfPartnersOfRepeatedBehaviorsOfUser
JOIN partners ON partner_id = partners.id

SELECT DISTINCT name, marker, frequency, amount
FROM (SELECT repeated_behavior_id
FROM repeated_behaviors_users_partners
WHERE user_id = 1) as idOfRepeatedBehaviorsOfUser
JOIN repeated_behaviors on repeated_behavior_id = repeated_behaviors.id




