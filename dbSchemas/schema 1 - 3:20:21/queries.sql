-- getting all behaviors and partners of a yser given user's id
SELECT *
FROM (SELECT *
FROM (SELECT * 
FROM (SELECT * 
FROM behaviors_users_partners
WHERE user_id = 1) as bhsUsersPrtnrs
JOIN partners ON partner_id = partners.id) as bhsUsersPrtnrsWithPrtnrInfo
LEFT JOIN repeated_behaviors ON repeated_behavior_id = repeated_behaviors.id)
as bhsUsersPrtnrsWithPrtnrInfoAndRptdBhrInfo
LEFT JOIN one_off_behaviors ON one_off_behavior_id = one_off_behaviors.id

