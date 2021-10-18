const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //when edit button is pressed for a map, renders localhost8080/edit/:id
  router.get("/:id", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.send("ERROR 401: You are unauthorized!");
      return;
    }

    //edit fields should be populated by its original data
    // //button or hyperlink will need to supply the map id they clicked on
    // const mapIdToSearch = res.body.mapId;
    let mapIdToSearch = 2;

    db.getMapById(mapIdToSearch)
      .then((result) => {
        const templateVars = result;
        res.send(templateVars);
        // res.render("name_chosen_for_explore/:id_template.ejs", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  //when confirm is pressed, updates that map with that id on db, redirects to /profile
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


