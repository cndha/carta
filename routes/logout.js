const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.clearCookie('user_id');
    res.redirect('/index');
  });

  return router;
};


