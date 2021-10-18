const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserById = function(userId) {

  const sqlString = `SELECT * FROM users WHERE id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.getUserById = getUserById;

const getMapsByKeyword = function(keyword) {

  const sqlString = `SELECT * FROM maps WHERE description LIKE '%$1%'`;

  return pool
  .query(sqlString, [keyword])
  .then(res => {
    return res.rows;
  })
  .catch(e => { console.error(e) });
}
exports.getMapsByKeyword = getMapsByKeyword;

const getMapById = function(mapId) {
  const sqlString = `SELECT * FROM maps WHERE id = $1`;

  return pool
  .query(sqlString, [mapId])
  .then(res => {
    return res.rows[0];
  })
  .catch(e => { console.error(e) });
}
exports.getMapById = getMapById;
