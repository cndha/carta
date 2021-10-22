DROP TABLE IF EXISTS markers CASCADE;

CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,

  title VARCHAR(223),
  description TEXT,
  image VARCHAR(223),
  formatted_Address VARCHAR(223),
  longitude DECIMAL NOT NULL,
  latitude DECIMAL NOT NULL,
  created_at TIMESTAMP
);
-- Jam Cafe, 556 Beatty St., Vancouver, British Columbia V6B 2L3, Canada
