const express = require('express');
const router = express.Router();

module.exports = (db, axios, environment) => {

  //when you click on your profile, renders localhost:8080/profile
  router.get("/", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.status(401);
      res.send("ERROR 401: YOU MUST BE LOGGED IN!");
      return;
    }

    const userId = req.cookies["user_id"];

    db.getUserById(userId)
      .then((resultForUser) => {
        db.getMapsOwnedByUser(userId)
          .then(resultsForUserMaps => {

            let templateVars = { maps: resultsForUserMaps, user: resultForUser };

            console.log("THESE ARE MAPS SENT TO PROFILE", templateVars.maps)
            res.render("profile", templateVars);

          }).catch(e => {
            console.error(e);
            res.send(e)
          });
      })
  });

  //request to get all maps loaded into profile page
  router.get("/userMaps", (req, res) => {

    let userIdToSearch = req.cookies["user_id"];

    db.getMapsOwnedByUser(userIdToSearch)
      .then((result) => {
        console.log("THESE ARE THE MAPS YOU OWN!", result);
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //request to get all maps favorited by that user loaded into profile page
  router.get("/favorites", (req, res) => {

    let userId = req.cookies["user_id"];

    db.getFavMapsByUser(userId)
      .then((result) => {
        console.log("HERE ARE YOUR FAVORITES: ", result);
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //request to get contributed maps by that user loaded into profile page
  router.get("/contributions", (req, res) => {

    let userId = req.cookies["user_id"];

    db.getMapsUserContributedTo(userId)
      .then((result) => {
        console.log("HERE ARE YOUR COLLABS:", result)
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });
  return router;
};
