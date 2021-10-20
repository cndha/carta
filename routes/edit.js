const express = require('express');
const router = express.Router();

module.exports = (db, axios, environment) => {

  //when edit button is pressed for a map, populates the edit fields and provides the map obj
  router.get("/:id", (req, res) => {

    // edit fields should be populated by its original data
    // button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;
    let mapIdToSearch = "req.body.mapId";

    db.getMapById(mapIdToSearch)
      .then((result) => {
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //when confirm is pressed, updates that map with that id on db
  router.patch("/:id", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // let objectToPass = {
    //   map_id : mapIdToSearch,
    //   title : res.body.title,
    //   description : res.body.description
    // }

    // db.functionToUpdateMap(objectToPass)
    //   .then(() => {
    //     res.json({Success: true});
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("POST to /edit/:id");
  });
  return router;
};


