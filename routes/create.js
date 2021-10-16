const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/create", (req, res) => {
    // //reminder to give error if not logged in
    // res.render("ejs_template_for_create", templateVars);
  });

  router.post("/create", (req, res) => {

    // //grab user_id from cookies
    // const user_id = req.cookies["user_id"];

    // //taking form fields (or put directly into database INSERT function)
    // const title = req.body.title;
    // const description = req.body.description;
    // const location = req.body.location;
    // const category = req.body.category;

    // //a function that takes in the form's fields and inserts those values into database
    // //INSERT INTO maps (the fields here) VALUES (the values)
    // //insert values grabbed from the html form
    // db.insertIntoDatabase(user_id, title, description, location, category);

    // //go back to profile page
    // res.redirect('/profile');
  });
  return router;
};


