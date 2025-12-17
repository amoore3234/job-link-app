CREATE TABLE IF NOT EXISTS user_registration (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(200),
  lastName VARCHAR(255),
  username VARCHAR(255),
  userEmail VARCHAR(255),
  userPassword VARCHAR(100),
  createdTimestamp Timestamptz,
  updatedTimestamp Timestamptz
);