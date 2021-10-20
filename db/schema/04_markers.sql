DROP TABLE IF EXISTS markers CASCADE;

CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,

  name VARCHAR(223),
  street VARCHAR(223),
  city VARCHAR(223) NOT NULL,
  province VARCHAR(223) NOT NULL,
  postalcode VARCHAR(223) NOT NULL,
  country VARCHAR(223) NOT NULL,
  longitude DECIMAL NOT NULL,
  latitude DECIMAL NOT NULL,
  created TIMESTAMP
);
-- Jam Cafe, 556 Beatty St., Vancouver, British Columbia V6B 2L3, Canada
