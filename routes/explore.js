const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //this page will be initially populated by this get
  router.get("/", (req, res) => {

    // functionToQuerySomeMapsToDisplayFromDatabase()
    // pass the templateVars to render so ejs can fill the page with a list of maps

    // db.functionToQuerySomeMapsToDisplayFromDatabase()
    //   .then((allMapsWeGot) => {
    //     const templateVars = allMapsWeGot;
    //     res.render("name_chosen_for_explore_template.ejs", templateVars);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("GET to /explore")
  });

  //page should dynamically load most popular (not reload)
  router.get("/most_popular", (req, res) => {

    // //function to return query to grabs maps with many visits? high rating?
    // const templateVars = db.popularMaps();

    // //pass the templateVars to render so ejs can fill
    // //the page with a list of maps
    // res.render("name_chosen_for_explore_template.ejs", templateVariable);

    // since it will by DynamicsCompressorNode, there will be no res.render?
    res.send("GET to /most_popular");
  });

  //when someone clicks a map image or title or looking at a single map
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