const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //edit fields should be populated by its original data
  router.get("/:id", (req, res) => {

    // //button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;
    // templateVars = db.functionToGetMap(mapIdToSearch)

    // //html will use templatevars to populate the text area with its original data
    // res.render("ejs_template_for_edit", templateVars);
  });

  router.post("/:id", (req, res) => {

    // //button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // //if statements to see what changes occur?
    // if (res.body.title) {
    // }
    // //UPDATE maps
    // //SET title = 'coolest area'
    // //WHERE map_id = mapIdToSearch;

    // let objectToPass = {
    //   map_id = mapIdToSearch,
    //   title = res.body.title,
    //   description = res.body.description
    // }

    // //i think i should pass the json object directly to the method and have the method do the if statements?
    // //or maybe i can format all the data into an object and pass that into the function?

    // db.functionToUpdateMap(objectToPass);
    // res.redirect('/profile');
  });
  return router;
};


