const express = require('express');
const { idle_in_transaction_session_timeout } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db, axios, environment) => {

  // when confirm button is pressed, inserts a map into db
  router.post("/", (req, res) => {

    console.log("THIS IS THE STUFF SENT BY CLIENT AJAX FOR CREATING A MAP:", req.body);

    const userId = req.cookies["user_id"];

    let objectToPass = {
      user_id: userId,
      title: req.body.title,
      description: req.body.description
    };

    console.log(objectToPass);

    // if (!req.body.title) {
    //   res.status(400);
    //   res.send("ERROR 400: Title attribute is required!");
    //   return;
    // }

    // if (req.body.title = "") {
    //   res.status(400);
    //   res.send("ERROR 400: Title cannot be empty!");
    //   return;
    // }

    // if (!req.body.description) {
    //   res.status(400);
    //   res.send("ERROR 400: description attribute is required!");
    //   return;
    // }

    // if (req.body.description = "") {
    //   res.status(400);
    //   res.send("ERROR 400: Description cannot be empty!");
    //   return;
    // }

    // db.saveNewMap(objectToPass)
    //   .then(() => {
    //     db.mostRecentMapByUser(userId)
    //       .then(mostRecentMap => {
    //         console.log("THIS IS THE MOST RECENT MAP", mostRecentMap)
    //         res.send(mostRecentMap);
    //       }).catch(e => {
    //         console.error(e);
    //         res.send(e)
    //       });
    //   })


    db.saveNewMap(objectToPass)
      .then((result) => {
        console.log("THIS IS THE MOST RECENT MAP", result)
        res.send(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  // renders create page when create button is pressed (localhost:8080/create)
  router.get("/", (req, res) => {
    res.render("create");
  });

  // when submit button for pin is pressed, add that pin to the database corresponding to that map (localhost:8080/create/pin)
  router.post("/pin/:id", (req, res) => {

    const userId = req.cookies["user_id"];

    console.log("PIN CREATE HAS BEEN CALLED")

    req.body.user_id = userId;

    console.log(req.body);

    db.saveNewMarker(req.body)
      .then(() => {
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.get("/information", (req, res) => {
    res.render("geocode");
  });

  router.get("/information/ask", (req, res) => {
    console.log("THIS IS REQ QUERY:", req.query);
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: req.query.latLng,
        key: 'AIzaSyCloL_uI_F9x3edJ_zViI7qC5zoq9u2HZg'
      }
    }).then((result) => {
      res.send(result.data);
    }).catch((error) => {
      console.log(error)
    })
  });

  return router;
};


