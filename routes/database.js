const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserById = function (id) {

  const sql = `SELECT * FROM users WHERE id = $1;`;
  console.log("getUserById", sql, id);
  return pool
    .query(sql, [id])
    .then(res => {
      console.log("getUserById: res.rows", res.rows);
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    })
    .catch(err => console.log(err.message));

}
exports.getUserById = getUserById;
