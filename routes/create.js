const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // res.render("ejs_template_for_create", templateVars);
    res.send("GET to /create");
  });

  router.post("/", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // grab user_id from cookies
    // const user_id = req.cookies["user_id"];

    // taking form fields (or put directly into database INSERT function)
    // validating for which fields are required will either be front end or server

    // let objectToPass = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   location: req.body.location,
    //   category: req.body.category
    // };

    // a function that takes in the form's fields and inserts those values into database
    // INSERT INTO maps (the fields here) VALUES (the values)
    // insert objects with the values grabbed from the html form into the function insertIntoDatabase()

    // db.insertIntoDatabase(objectToPass)
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


