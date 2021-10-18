DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  owned_by INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT
  -- category VARCHAR(225),
  -- city VARCHAR(223) NOT NULL,
  -- province VARCHAR(223) NOT NULL,
  -- country VARCHAR(223) NOT NULL,
  -- likes INTEGER,
  -- created_at TIMESTAMP,
  -- completed_at TIMESTAMP,
  -- last_edit TIMESTAMP,
  -- saved BOOLEAN DEFAULT false,
  -- deleted BOOLEAN DEFAULT false,
  -- public BOOLEAN DEFAULT false,
  -- private BOOLEAN DEFAULT true
);

