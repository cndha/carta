const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserById = function (id) {

  return pool
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    })
    .catch(err => console.log(err.message));

}
exports.getUserById = getUserById;
