const express = require('express');
const router = express.Router();

//cookie parser to get login id

module.exports = (db) => {
  router.get("/:id", (req, res) => {

    //need form to enter user_id
    res.cookie('user_id', req.params.id);

    res.redirect('/');
  });
  return router;
};


