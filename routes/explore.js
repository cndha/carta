const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //when you enter the explore page, sends map data to client
  router.get("/", (req, res) => {

    // functionToQuerySomeMapsToDisplayFromDatabase()
    // pass the output to client side so client side can render

    // db.functionToQuerySomeMapsToDisplayFromDatabase()
    //   .then((allMapsWeGot) => {
    //     res.send({allMapsWeGot});
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("GET to /explore")
  });

  //when most popular button is pressed, sends popular maps obj to client
  router.get("/most_popular", (req, res) => {

    // db.popularMaps()
    //   .then((popularMapsWeGot) => {
    //      res.send({popularMapsWeGot});
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("GET to /most_popular");
  });

  // when you click on a map to look at, renders localhost:8080/explore/:id
  router.get("/:id", (req, res) => {
    // button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;
    // database function to return map data given its id from the form (res.body.mapId) to pass to render

    // db.functionToQueryForAMapWithThisId(mapIdToSearch)
    //   .then((AMapWithThisId) => {
    //     const templateVars = AMapWithThisId;
    //     res.render("name_chosen_for_explore/:id_template.ejs", templateVars);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("GET to /explore/:id");
  });
  return router;
};
