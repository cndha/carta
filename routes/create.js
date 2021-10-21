const express = require('express');
const { idle_in_transaction_session_timeout } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db, axios, environment) => {

  // when confirm button is pressed, inserts a map into db
  router.post("/", (req, res) => {

    // if (!req.cookies["user_id"]) {
    //   res.send("ERROR 401: You are unauthorized!");
    //   return;
    // }

    console.log("THIS IS THE STUFF SENT BY CLIENT AJAX :", req.body);

    db.createMap(req.body)
      .then(() => {
        console.log("SERVER SENDING BACK RESULT: SUCCESS!");
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

    // grab user_id from cookies
    // const user_id = req.cookies["user_id"];

    // taking form fields (or put directly into database INSERT function)

    //validation
    // let objectToPass = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   location: req.body.location,
    //   category: req.body.category
    // };

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
  });

  // renders create page when create button is pressed (localhost:8080/create)
  router.get("/", (req, res) => {
    res.render("create");
  });

  // when submit button for pin is pressed, add that pin to the database corresponding to that map (localhost:8080/create/pin)
  router.post("/pin", (req, res) => {

    // let data = req.body;
    let data = "1";
    db.saveNewMarker(data)
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

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: req.query,
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


