DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  -- marker_id INTEGER REFERENCES markers(id) ON DELETE CASCADE,
  -- favourited_by INTEGER REFERENCES favourites(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  likes INTEGER,
  created_at TIMESTAMP,
  completed_at TIMESTAMP,
  -- last_edit TIMESTAMP,
  -- saved BOOLEAN DEFAULT false,
  -- deleted BOOLEAN DEFAULT false,
  -- public BOOLEAN DEFAULT false,
  -- private BOOLEAN DEFAULT true
);

