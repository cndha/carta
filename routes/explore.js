const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //when you enter the explore page, sends map data to client
  router.get("/", (req, res) => {

    const keyword = "ancouver";
    db.getMapsByKeyword(keyword)
      .then(results => {
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // when you click on a map to look at, renders localhost:8080/explore/:id
  router.get("/:id", (req, res) => {

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
  return router;
};
