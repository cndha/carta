const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //when you enter the search page with an id, localhost:8080/index/1, redirects to localhost:8080/index/
  router.get("/:id", (req, res) => {

    res.cookie('user_id', req.params.id);
    res.redirect('/index');
  });

  // when you enter the search page, renders localhost:8080/index
  router.get("/", (req, res) => {

    //if no user is logged in, render page as is
    if (!req.cookies["user_id"]) {
      res.render("index");
      return;
    }

    //otherwise, load page with that user_id's information
    db.getUserById(userId)
      .then((profile) => {
        const templateVars = profile;
        res.render("index", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });
  return router;
};


