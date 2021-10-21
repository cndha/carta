const express = require('express');
const router = express.Router();

module.exports = (db, axios, environment) => {

  //when edit button is pressed for a map, populates the edit fields and renders the page for editing
  router.get("/:id", (req, res) => {

    // edit fields should be populated by its original data
    // let mapIdToSearch = "req.body.mapId";
    let mapIdToSearch = 1;

    db.getMapById(mapIdToSearch)
      .then((result) => {
        res.render("edit", result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //when confirm is pressed, updates that map with that id on db
  router.patch("/map/:id", (req, res) => {

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

    let data = "data to update map";

    db.functionToUpdateMap(data)
      .then(() => {
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

    res.send("POST to /edit/:id");
  });

  router.patch("/pin/:id", (req, res) => {

    let data = "data to update pin";

    db.functionToUpdatePin(data)
      .then(() => {
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

    res.send("POST to /edit/:id");
  });

  //when you click the delete button, deletes map from db with that id
  router.delete("/delete/map/:id", (req, res) => {

    const mapIdToSearch = "res.body.mapId DELETE MAP INFO";

    db.functionToDeleteMap(mapIdToSearch)
      .then(() => {
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //when you click the delete button, deletes pin from db with that id
  router.delete("/delete/pin/:id", (req, res) => {

    const mapIdToSearch = "res.body.mapId DELETE PIN INFO";

    db.functionToDeletePin(mapIdToSearch)
      .then(() => {
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });
  return router;
};


