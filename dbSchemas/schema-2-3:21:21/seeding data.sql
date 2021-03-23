-- Adding a new user
INSERT INTO users (username, password, email)
VALUES 
  ('mL', 'noFap', 'fapyourwaytofinancialfreedom@gmail.com')

INSERT INTO users (username, password, email)
VALUES 
  ('LBJ', 'GOAT', 'tacoTuesday@gmail.com')

-- B4: adding a new repeated behavior 
INSERT INTO repeated_behaviors (name, marker, frequency, amount)
VALUES 
  ('send money to grandma', 
   ARRAY [ true,
      false, true, true ], 'monthly', 100)

INSERT INTO repeated_behaviors_users_partners (repeated_behavior_id,
                    user_id, partner_id)
VALUES 
  (1, 1, NULL)
-- AFTER: adding a new repeated behavior 

-- B4: adding a new partner (to monitor a repeated behavior)
INSERT INTO partners (relationship, email,
                    report_frequency, status)
VALUES 
  ('best friend', 
   'hth@gmail.com', 'biannually', 'not yet accepted')

UPDATE repeated_behaviors_users_partners
SET partner_id = 1
WHERE repeated_behavior_id = 1 AND user_id = 1
-- AFTER: adding a new partner (to monitor a repeated behavior)


-- B4: adding a new 1Off behavior 
INSERT INTO one_off_behaviors (name, marker)
VALUES 
  ('Open a High-Yield Savings Account', false)

INSERT INTO one_off_behaviors_users_partners (one_off_behavior_id,
                    user_id, partner_id)
VALUES 
  (1, 1, NULL)
-- AFTER: adding a new 1Off behavior 

-- B4: adding a new partner (to monitor a 1Off behavior)
INSERT INTO partners (relationship, email,
                    report_frequency, status)
VALUES 
  ('spouse', 
   'someSpouse@gmail.com', 'annually', 'not yet accepted')

UPDATE one_off_behaviors_users_partners
SET partner_id = 2
WHERE one_off_behavior_id = 1 AND user_id = 1
-- AFTER: adding a new partner (to monitor a 1Off behavior)

-- B4: adding another partner for a bh that some other partner already monitors
INSERT INTO partners (relationship, email,
                    report_frequency, status)
VALUES 
  ('uncle', 
   'datCoolUncle@gmail.com', 'monthly', 'not yet accepted')

INSERT INTO one_off_behaviors_users_partners (one_off_behavior_id,
                    user_id, partner_id)
VALUES 
  (1, 1, 3)
-- AFTER: adding another partner for a bh that some other partner already monitors

-- B4: adding a new 1Off behavior 
INSERT INTO one_off_behaviors (name,marker)
VALUES ('Do Your Taxes', false)

INSERT INTO one_off_behaviors_users_partners (one_off_behavior_id,
                    user_id, partner_id)
VALUES 
  (2, 1, NULL)
-- AFTER: adding a new 1Off behavior 

-- B4: getting a pre-existing partner to monitor a 1Off behavior
UPDATE one_off_behaviors_users_partners
SET partner_id = 3
WHERE one_off_behavior_id = 2 AND user_id = 1
-- AFTER: getting a pre-existing partner to monitor a 1Off behavior

-- B4: adding a new repeated behavior 
INSERT INTO repeated_behaviors (name, marker, frequency, amount)
VALUES 
  ('send money to parents', 
   ARRAY [ true,
      true, false, false ], 'biannually', 500)

INSERT INTO repeated_behaviors_users_partners (repeated_behavior_id,
                    user_id, partner_id)
VALUES 
  (2, 1, NULL)
-- AFTER: adding a new repeated behavior 

-- B4: getting a pre-existing partner to monitor a repeated behavior
UPDATE repeated_behaviors_users_partners
SET partner_id = 1
WHERE repeated_behavior_id = 2 AND user_id = 1
-- AFTER: getting a pre-existing partner to monitor a repeated behavior


