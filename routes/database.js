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
  const sqlString = `SELECT title, description FROM maps WHERE description LIKE '%${$1}%''`;
  return pool
    .query(sqlString, values)
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsByKeyword = getMapsByKeyword;


//display a single map by looking up /:id
const getMapById = function (mapId) {
  const sqlString = `SELECT title, description FROM maps WHERE id = $1`;

  return pool
    .query(sqlString, [mapId])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.getMapById = getMapById;


//shows maps OWNED/created by user
const getMapsOwnedByUser = function (userId) {
  const sqlString = `SELECT * FROM maps WHERE owner_id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsOwnedByUser = getMapsOwnedByUser;


//shows maps user has contributed to
const getMapsUserContributedTo = function (userId) {
  const sqlString = `SELECT title, description FROM maps JOIN contributors ON map_id = maps.id WHERE contributors.user_id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsUserContributedTo = getMapsUserContributedTo;


//shows all the maps favourited by user
const getFavMapsByUser = function (userId) {

  const sqlString = `SELECT maps.title, maps.descriptuon FROM maps JOIN favourites ON map_id = maps.id JOIN users ON user_id = users.id WHERE favourites.user_id = $1 ORDER BY favourited_at DESC`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getFavMapsByUser = getFavMapsByUser;

//displayMAP function - shows map & markers
const displayMap = function(mapId) {

  // const sqlString = `SELECT maps.title, maps.description, markers.id, markers.latitude, markers.longitude FROM markers JOIN maps ON map_id = maps.id WHERE map_id = $1`;

  const sqlString = `SELECT markers.id, markers.latitude, markers.longitude FROM markers WHERE map_id = $1`;

  return pool
  .query(sqlString, [mapId])
  .then(res => { //get an array of objects with select fields from table
    console.log(res.rows);

    res.rows.forEach((element) => {
      let latLng = [ res.rows.latitude, res.rows.longitude ];

    })

  })
  .catch(e => { console.error(e) });

  // req.body is object
  // pull data from object & call saveNewMap()
  // loop through marker values & call saveNewMarker()

}
exports.displayMap = displayMap;
displayMap(3);


//saves a new map
const saveNewMap = function (map) {

  const sqlString = `INSERT INTO maps (owner_id, title, description, created_at) VALUES ($1, $2, $3, $4) RETURNING *`;

  return pool
    .query(sqlString, [map.owner_id, map.title, map.description, map.created_at])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.saveNewMap = saveNewMap;

//edit map
const editMap = function (map) {

  const sqlString = `UPDATE maps SET title = $1, description = $2`;

  return pool
    .query(sqlString, [map.title, map.description])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.editMap = editMap;

// var options = {
//   zoom: 8;
//   center: {lat: , lng: }
// }
// var map = new google.maps.Map(document.getElementById('map'), options);


// function for looping through marker objects, everytime you pass thorugh it, it calls addNewMarker

//delete map
const deleteMap = function (mapId) {

  const sqlString = `DELETE FROM maps WHERE id = $1`;

  return pool
    .query(sqlString, [mapId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteMap = deleteMap;


//saves markers on new map
const saveNewMarker = function (marker) {

  // this just saving information per marker, **need another function to pull up markers for a given map_id

  // how to add user_id / map_id to marker? --> server side

  const sqlString = `INSERT INTO markers (user_id, map_id, title, description, image, street, city, province, postalcode, country, longitude, latitude, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

  return pool
    .query(sqlString, [marker.user_id, marker.map_id, marker.title, marker.description, marker.image, marker.street, marker.city, marker.province, marker.postalcode, marker.country, marker.longitude, marker.latitude, marker.created_at])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.saveNewMarker = saveNewMarker;


//saves edited marker
const editMarker = function (markerId) {

  const sqlString = `UPDATE markers SET title = $1, description = $2, image = $3, street = $4, city = $5, province = $6, postalcode = $7, country = $8, latitude = $9, longitude = $10`;

  return pool
    .query(sqlString, [markerId.title, markerId.description, markerId.image, markerId.street, markerId.city, markerId.province, markerId.postalcode, markerId.country, markerId.latitude, markerId.longitude])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.editMarker = editMarker;


//deletes marker from db
const deleteMarker = function (markerId) {

  const sqlString = `DELETE FROM markers WHERE id = $1`;

  return pool
    .query(sqlString, [markerId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteMarker = deleteMarker;



// var marker = new google.maps.Marker({
//   position: {lat: ,lng: };
//   map: map_id;
//   content: marker.name, etc.
// })

// var infoWindow = new.google.maps.InfoWindow({
//   content: '';
// });


//sharing map with other users to collab
const addContributor = function (contributor) {

  const sqlString = `INSERT INTO contributors (user_id, map_id, contribution_date) VALUES ($1, $2, $3) RETURNING *`;

  return pool
    .query(sqlString, [contributor.user_id, contributor.map_id, contributor.contribution_date])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) })

};
exports.addContributor = addContributor;

