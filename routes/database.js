const { Pool } = require('pg');
// const request = require('request');

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


//search for all maps using keyword
const getMapsByKeyword = function (keyword) {
  // let newkeyword = "%" + keyword + "%";
  const sqlString = `SELECT * FROM maps WHERE description LIKE '%${$1}%''`;
  return pool
    .query(sqlString, [newkeyword])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsByKeyword = getMapsByKeyword;


//display a single map by looking up /:id
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


//shows in profile - all the maps the user has created & collaborated
const getAllMapsByUser = function(userId) {
  const sqlString = `SELECT * FROM maps JOIN contributors ON map_id = maps.id WHERE maps.owner_id = $1 AND contributors.user_id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getAllMapsByUser = getAllMapsByUser;

//shows all the maps favourited by user
const getFavMapsByUser = function(userId) {

  const sqlString = `SELECT * FROM maps JOIN favourites ON map_id = maps.id JOIN users ON user_id = users.id WHERE favourites.user_id = $1 ORDER BY favourited_at DESC`;

  return pool
  .query(sqlString, [userId])
  .then(res => {
    return res.rows;
  })
  .catch(e => { console.error(e) });
}
exports.getFavMapsByUser = getFavMapsByUser;


//creating a new map
const createNewMap = function(map) {

  // var options = {
  //   zoom: 8;
  //   center: {lat: , lng: }
  // }
  // var map = new google.maps.Map(document.getElementById('map'), options);

  const sqlString = `INSERT INTO maps (owner_id, title, description, likes, created_at, completed_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  return pool
  .query(sqlString, [])
  .then(res => {
    return res.rows[0];
  })
  .catch(e => { console.error(e) });

}
exports.createNewMap = createNewMap;

// const fetchMarker = function(location, callback) {
//   request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiY29wbzEyMyIsImEiOiJja3V2dTdvdHMxcjdrMm9xanBtaGdkaHc4In0.cBeBLEBv8OE9UnZgr7EEzQ`, (error, response, body) => {
//     if (error) {
//       return callback(error, null);
//     }

//     if (response.statusCode > 200 || response.statusCode < 200) {
//       return callback(error, null);
//     }

//     const data = JSON.parse(body).features[0];
//     console.log('FROM FETCH MARKER:', data);
//     return callback(null, data);
//   });

// };
// exports.fetchMarker = fetchMarker;
// fetchMarker("Empire state building", () => {});

  //data.text = name of location
  //data.place_name = name, street address, state, postal code, country
  //data.center = coordinates in an array
  // but if you search by address, name of place doesn't show


//runs when ADD button is submitted on a marker
const addNewMarker = function(location) {

// var marker = new google.maps.Marker({
//   position: {lat: ,lng: };
//   map: map_id;
//   content: location.name, etc.
// })

// var infoWindow = new.google.maps.InfoWindow({
//   //   content: '';
//   // });

  // how to add user_id / map_id to marker?

  const sqlString = `INSERT INTO markers (user_id, map_id, name, street, city, province, postalcode, country, longitude, latitude, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

  return pool
  .query(sqlString, [location.user_id, location.map_id, location.name, location.street, location.city, location.province, location.postalcode, location.country, location.longitude, location.latitude, created])
  .then(res => {
    return res.rows[0];
  })
  .catch(e => { console.error(e) });

}
exports.addNewMarker = addNewMarker;


//sharing map with other users to collab
const addContributor = function(contributor) {

  const sqlString = `INSERT INTO contributors (user_id, map_id, contribution_date) VALUES ($1, $2, $3) RETURNING *`;

  return pool
  .query(sqlString, [contributor.user_id, contributor.map_id, contributor.contribution_date])
  .then(res => {
    return res.rows;
  })
  .catch(e => { console.error(e) })

};
exports.addContributor = addContributor;

