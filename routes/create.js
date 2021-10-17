const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // when create button is pressed, renders localhost:8080/create
  router.get("/", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // res.render("ejs_template_for_create", templateVars);
    res.send("GET to /create");
  });

  // when confirm button is pressed, inserts a map into db, redirects to /profile
  router.post("/", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

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

    // db.createMap(objectToPass)
    //   .then(() => {
    //     res.redirect('/profile');
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("POST to /create");
  });
  return router;
};


