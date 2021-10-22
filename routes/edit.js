const express = require('express');
const router = express.Router();

module.exports = (db, axios, environment) => {

  //when edit button is pressed for a map, populates the edit fields and renders the page for editing
  router.get("/:id", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.status(401);
      res.send("ERROR 401: YOU MUST BE LOGGED IN!");
      return;
    }
    // edit fields should be populated by its original data
    // let mapIdToSearch = "req.body.mapId";
    let mapIdToSearch = req.params.id;

    db.getMapById(mapIdToSearch)
      .then((resultForMap) => {
        db.getMarkersForMap(mapIdToSearch)
          .then(resultsForMarkers => {

            let templateVars = { markers: resultsForMarkers, map: resultForMap, mapId: mapIdToSearch };
            res.render("edit", templateVars);

          }).catch(e => {
            console.error(e);
            res.send(e)
          });
      })

    // db.getMapById(mapIdToSearch)
    //   .then((result) => {
    //     res.render("edit", result);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });
  });

  //when confirm is pressed, updates that map with that id on db
  router.post("/map/:id", (req, res) => {


    // button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;s

    let data = req.body;
    data.id = req.params.id;

    console.log(data);

    db.editMap(data)
      .then((result) => {
        console.log("FINISHED FETCHING FROM DATABASE!", result)
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });


  router.patch("/pin/:id", (req, res) => {

    let data = "data to update pin";

    db.editMarker(data)
      .then(() => {
        res.json({ Success: true });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  //when you click the delete button, deletes map from db with that id
  router.delete("/delete/map/:id", (req, res) => {

    const mapIdToSearch = req.params.id;

    db.deleteMap(mapIdToSearch)
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

    const pinIdToSearch = "res.body.mapId DELETE PIN INFO";

    db.deleteMarker(mapIdToSearch)
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


