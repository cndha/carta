const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // when you enter the search page, renders localhost:8080/index
  router.get("/", (req, res) => {
    //if no user is logged in, render page as is
    if (!req.cookies["user_id"]) {
      res.render("index");
      console.log(process.env);
      return;
    }
    //otherwise, load page with that user_id's information
    const userId = req.cookies["user_id"];
    const environment = require("dotenv").config();
    db.getUserById(userId)
      .then((profile) => {
        const templateVars = { profileData: profile, env: environment };
        res.render("index", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};


