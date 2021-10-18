const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //does profile immediately load all your maps?
  router.get("/", (req, res) => {

    //get the cookie id
    //const userId = req.cookies["user_id"];

    //have a function to query SELECT * FROM users WHERE user_id = cookieid or any other info -> querySelectAll()
    //pass the returned promise from function to templateVars

    //pass the templateVars to render so ejs can call on the user object when needed

    // db.querySelectAll(userId)
    //   .then((allMapsWeGot) => {
    //     const templateVars = allMapsWeGot;
    // res.render("name_chosen_for_profile_template.ejs", templateVars);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.render("profile");
    // res.send("GET to /profile");
  });

  //assuming /profile/ loads all maps
  router.post("/delete/:id", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // //button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // // database function to DELETE map entry where id equals mapIdToSearch
    // db.functionToGetMapData(mapIdToSearch);

    // res.redirect('/');
    res.send("POST to profile/delete/:id")
  });

  router.get("/favorites", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // const userId = req.cookies["user_id"];

    //have a query to select favorited maps by user id
    //pass the query results needed to templateVars

    // db.favouriteMaps(userId)
    //   .then((favoriteMaps) => {
    //     const templateVars = favoriteMaps;
    // res.render("name_chosen_for_profile_template.ejs", templateVars);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("GET to /profile/favorites");
  });

  router.get("/contributions", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // const userId = req.cookies["user_id"];

    //have a query to select contributed maps by user id
    //pass the query results needed to templateVars

    // db.contributedMaps(userId)
    //   .then((mapsThisUserIdCVontributedTo) => {
    //     const templateVars = mapsThisUserIdCVontributedTo;
    // res.render("ejs_template_for_contributions", templateVars);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("GET to /profile/contributions");
  });
  return router;
};
