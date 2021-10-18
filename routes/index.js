const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //when you enter the search page with an id, localhost:8080/index/1, redirects to localhost:8080/index/
  router.get("/:id", (req, res) => {

    //this will give cookie a key user_id and :id will be the id
    res.cookie('user_id', req.params.id);

    res.redirect('/index');
  });

  // when you enter the search page, renders localhost:8080/index
  router.get("/", (req, res) => {

    //need to see if there is user_id key in cookie
    const templateVars = { user: "userId here incase they are at index and logged in" };
    res.render("index", templateVars);
  });
  return router;
};


