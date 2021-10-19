const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserById = function (userId) {

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


const getMapsByKeyword = function (keyword) {
  let newkeyword = "%" + keyword + "%";
  const sqlString = `SELECT * FROM maps WHERE description LIKE $1`;
  return pool
    .query(sqlString, [newkeyword])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsByKeyword = getMapsByKeyword;


const getMapById = function (mapId) {
  const sqlString = `SELECT * FROM maps WHERE id = $1`;

  return pool
    .query(sqlString, [mapId])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.getMapById = getMapById;


const getAllMapsByUser = function(userId) {
  const sqlString = `SELECT * FROM maps WHERE owner_id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getAllMapsByUser = getAllMapsByUser;


const addNewMap = function(title, description) {

  const sqlString = `INSERT INTO maps VALUES () RETURNING *`;


}

// const request = require('request');
// const fetchMarker = function(url, userId, callback) {

//   require(url, (error, status, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     } else if (!response) {
//       callback(error, null);
//       return;
//     } else {
//       const data = JSON.parse(body).users;
//       callback(null, data[username]);
//     }
//   })

// };



const addNewMarker = function(location) {

  // response.features[0]["text"] = name of location
  // response.features[0]["place_name"] = "Empire State Building, 350 5th Ave, New York, New York 10118, United States",
  // but if you search by address, name of place doesn't show
  // how to add map_id to marker?

  const sqlString = `INSERT INTO markers (map_id, name, street, city, province, postalcode, country, longitude, latitude, created)`;

  return pool
  .query(sqlString, [location.map_id, location.name, location])
  .then(res => {
    return res.rows;
  })
  .catch(e => { console.error(e) });

}
exports.addNewMarker = addNewMarker;


const addContributor = function(userId) {

  const sqlString = ``;

  return pool
  .query(sqlString, [userId])
  .then(res => {
    return res.rows[0];
  })
  .catch(e => { console.error(e) })

};


