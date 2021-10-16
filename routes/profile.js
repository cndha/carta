const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //does profile immediately load all your maps?
  router.get("/", (req, res) => {

    // //get the cookie id
    // const userId = req.cookies["user_id"];

    // //have a query to SELECT * FROM users WHERE user_id = cookieid or any other info (querySelectAll)
    // //pass the query results needed to templateVars
    // const templateVars = db.querySelectAll(userId);

    // //pass the templateVars to render so ejs can make
    // //the page and call on the info in the user object when needed
    // res.render("name_chosen_for_profile_template.ejs", templateVars);
    res.send("GET to /profile");
  });

  //assuming /profile/ loads all maps
  router.post("/delete/:id", (req, res) => {

    // //button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // // database function to DELETE map entry where id equals mapIdToSearch
    // db.functionToGetMapData(mapIdToSearch);

    // res.redirect('/');
    res.send("POST to profile/delete/:id")
  });

  router.get("/favorites", (req, res) => {

    // const userId = req.cookies["user_id"];

    // //have a query to select favorited maps by user id
    // //pass the query results needed to templateVars
    // const templateVars = db.favouriteMaps(userId);

    // res.render("ejs_template_for_favorites", templateVars);
    res.render("GET to /profile/favorites");
  });

  router.get("/contributions", (req, res) => {

    // const userId = req.cookies["user_id"];

    // //have a query to select contributed maps by user id
    // //pass the query results needed to templateVars
    // const templateVars = db.contributedMaps(userId);

    // res.render("ejs_template_for_contributions", templateVars);
    res.send("GET to /profile/contributions");
  });
  return router;
};
