const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //edit fields should be populated by its original data
  router.get("/:id", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    // //button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;

    // //html will use templatevars to populate the text area with its original data
    // res.render("ejs_template_for_edit", templateVars)

    // db.functionToGetMapFromDb(mapIdToSearch)
    // .then((theMapWeGot) => {
    //   const templateVars = theMapWeGot;
    //   res.render("ejs_template_for_edit/:id", templateVars)
    // })
    // .catch(e => {
    //   console.error(e);
    //   res.send(e)
    // });

    res.send("GET to /edit/:id");
  });

  router.post("/:id", (req, res) => {

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

    // if statements to see what changes occur in functionToUpdateMap(objectToPass)
    // if (objectToPass.title) {
    // }
    // //UPDATE maps
    // //SET title = 'coolest area'
    // //WHERE map_id = mapIdToSearch;

    // db.functionToUpdateMap(objectToPass)
    //   .then(() => {
    //     res.redirect('/profile');
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });

    res.send("POST to /edit/:id");
  });
  return router;
};


