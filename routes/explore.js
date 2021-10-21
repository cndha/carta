const express = require('express');
const router = express.Router();



module.exports = (db, axios, environment) => {


  //when you enter the explore page, sends map data to client
  router.get("/", (req, res) => {

    let keyword = "ancouver";

    db.getMapsByKeyword(keyword)
      .then(results => {
        res.json(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // when you click on a map to look at, renders localhost:8080/explore/:id
  router.get("/:id", (req, res) => {

    let mapIdToSearch = req.params.id;

    db.getMapById(mapIdToSearch)
      .then((resultForMap) => {
        db.getMarkersForMap(mapIdToSearch)
          .then(resultsForMarkers => {

            let templateVars = { markers: resultsForMarkers, map: resultForMap };
            global = templateVars;
            res.render("exploreId", templateVars);

          }).catch(e => {
            console.error(e);
            res.send(e)
          });
      })
  });

  router.get("/afterLoad/:id", (req, res) => {

    let mapIdToSearch = req.params.id;

    db.getMapById(mapIdToSearch)
      .then((resultForMap) => {
        db.getMarkersForMap(mapIdToSearch)
          .then(resultsForMarkers => {

            let templateVars = { markers: resultsForMarkers, map: resultForMap };
            global = templateVars;

            console.log("GIVING INFO TO CLIENT----------------------------")
            res.send(templateVars);

          }).catch(e => {
            console.error(e);
            res.send(e)
          });
      })
  });
  return router;
};
