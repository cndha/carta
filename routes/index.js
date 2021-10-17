const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  router.get("/:id", (req, res) => {
    //this will give cookie a key user_id and :id will be the id
    //this will be like signing in a user
    res.cookie('user_id', req.params.id);

    res.redirect('/');
  });

  router.get("/", (req, res) => {

    //need to see if there is user_id key in cookie
    const templateVars = { hello: "userId here incase they are at index and logged in" };
    res.render("index", templateVars);
  });
  return router;
};


