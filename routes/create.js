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


    // axios.get('https://api.github.com/users/mapbox')
    //   .then((response) => {
    //     console.log("THIS IS THE RESPONSE", response.data);
    //   });

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
  return router;
};


