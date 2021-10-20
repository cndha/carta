const express = require('express');
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

    // a function that takes in the form's fields and inserts those values into database
    // INSERT INTO maps (the fields here) VALUES (the values)
    // insert objects with the values grabbed from the html form into the function createMap()

    // const objectToPass = {
    //   user_id: 1,
    //   description: "hello world",
    //   title: "some map"
    // }

    // db.createMap(objectToPass)
    //   .then(() => {
    //    res.json({Success: true});
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });


  });

  // http://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=30.333472,-81.470448&includeRoadMetadata=true&includeNearestIntersection=true

  router.get("/information", (req, res) => {


    // console.log("THIS IS THE REQUEST", req.query);

    // res.send("done");

    axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${environment.API_KEY_MAP_QUEST}&location=${req.query.latitude},${req.query.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)
      .then((response) => {
        console.log("CALLING MAP QUEST DB");

        res.send(JSON.stringify(response.data));
      }).catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }

      });
  });


  return router;
};


