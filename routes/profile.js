const express = require('express');
const router = express.Router();

module.exports = (db, axios, environment) => {

  //when you click on your profile, renders localhost:8080/profile
  router.get("/", (req, res) => {

    const userId = req.cookies["user_id"];

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

  //when you click the delete button, deletes map from db with that id
  router.delete("/delete/:id", (req, res) => {

    // if (!req.cookies["user_id"]) {
    //   res.send("ERROR 401: You are unauthorized!");
    //   return;
    // }

    // button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // database function to DELETE map entry where id equals mapIdToSearch

    // db.functionToDeleteMap(mapIdToSearch)
    //   .then(() => {
    //     res.json({Success: true});
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    // res.send("POST to profile/delete/:id")
  });

  //request to get all maps loaded into profile page
  router.get("/userMaps", (req, res) => {

    let mapIdToSearch = "req.body.mapId";

    db.getAllMapsOwnedByUser(mapIdToSearch)
      .then((result) => {
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //request to get all maps favorited by that user loaded into profile page
  router.get("/favorites", (req, res) => {

    let mapIdToSearch = "req.body.mapId";

    db.getFavMapsByUser(mapIdToSearch)
      .then((result) => {
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.get("/contributions", (req, res) => {


    res.send("GET to /profile/contributions");
  });
  return router;
};
