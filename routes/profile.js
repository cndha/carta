const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //when you click on your profile, renders localhost:8080/profile
  router.get("/", (req, res) => {

    // get the cookie id
    const userId = req.cookies["user_id"];

    //have a function to query SELECT * FROM users WHERE user_id = cookieid or any other info -> querySelectProfile()
    //pass the output from function to templateVars

    //pass the templateVars to render so ejs can call on the user object when needed

    db.getUserById(userId)
      .then((profile) => {
        const templateVars = profile;
        res.render("profile", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //when you click the delete button, deletes map from db with that id, goes back to profile after
  router.delete("/delete/:id", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // database function to DELETE map entry where id equals mapIdToSearch

    // db.functionToDeleteMap(mapIdToSearch)
    //   .then(() => {
    //     res.redirect('/profile');
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("POST to profile/delete/:id")
  });

  //when you click your favorites, renders localhost:8080/profile/favorites
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
    // res.render("name_chosen_for_favorites_template.ejs", templateVars);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("GET to /profile/favorites");
  });

  //when you click your contributions, renders localhost:8080/profile/contributions
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
