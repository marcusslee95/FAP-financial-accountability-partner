CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar(50) NOT NULL,
  "password" varchar(70) NOT NULL,
  "email" varchar(60) NOT NULL
);

CREATE TABLE "partners" (
  "id" SERIAL PRIMARY KEY,
  "relationship" varchar(50) NOT NULL,
  "email" varchar(60) NOT NULL,
  "report_frequency" varchar(20) NOT NULL,
  "status" varchar(20) NOT NULL
);

CREATE TABLE "one_off_behaviors" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "marker" boolean NOT NULL
);

CREATE TABLE "repeated_behaviors" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "marker" boolean[] NOT NULL,
  "frequency" varchar(20) NOT NULL,
  "amount" integer NOT NULL
);

CREATE TABLE "behaviors_users_partners" (
  "id" SERIAL PRIMARY KEY,
  "repeated_behavior_id" integer,
  "one_off_behavior_id" integer,
  "user_id" integer,
  "partner_id" integer
);

ALTER TABLE "behaviors_users_partners" ADD FOREIGN KEY ("repeated_behavior_id") REFERENCES "repeated_behaviors" ("id");

ALTER TABLE "behaviors_users_partners" ADD FOREIGN KEY ("one_off_behavior_id") REFERENCES "one_off_behaviors" ("id");

ALTER TABLE "behaviors_users_partners" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "behaviors_users_partners" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");
