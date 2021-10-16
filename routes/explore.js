const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //this page will be initially populated by this get
  router.get("/", (req, res) => {

    console.log("get to explore")

    // //function to return query to grab maps from database (maybe max 10?)
    // const templateVars = db.queryToSelectAllMapsToDisplay();

    // //pass the templateVars to render so ejs can fill
    // //the page with a list of maps
    // res.render("name_chosen_for_explore_template.ejs", templateVariable);

  });

  //page should dynamically load most popular (not reload)
  router.get("/most_popular", (req, res) => {

    console.log("get to most popular")
    // //function to return query to grabs maps with many visits? high rating?
    // const templateVars = db.popularMaps();

    // //pass the templateVars to render so ejs can fill
    // //the page with a list of maps
    // res.render("name_chosen_for_explore_template.ejs", templateVariable);

    // since it will by DynamicsCompressorNode, there will be no res.render?

  });

  //when someone clicks a map image or title or looking at a single map
  router.get("/:id", (req, res) => {


    console.log("get to /explore/id")
    // //button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // // database function to return map data to pass to render
    // const templateVariable = db.functionToGetMapData(mapIdToSearch);

    // res.render("name_chosen_for_explore_template.ejs", templateVariable);
  });
  return router;
};
