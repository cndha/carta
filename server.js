// load .env data into process.env
const environment = require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

const axios = require('axios');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

const { getUserById, getMapsByKeyword, getMapById, getMapsOwnedByUser, saveNewMarker, getMapsUserContributedTo, getFavMapsByUser, getMarkersForMap, mostRecentMapByUser, saveNewMap } = require("./routes/database");
const pool = new Pool(dbParams);
pool.connect();
const db = {
  saveNewMarker,
  saveNewMap,
  mostRecentMapByUser,
  getMarkersForMap,
  getUserById,
  getMapsByKeyword,
  getMapById,
  getMapsOwnedByUser,
  getMapsUserContributedTo,
  getFavMapsByUser,

  // saveNewMarker: function (obj) {
  //   return new Promise((res, rej) => {
  //     console.log("SAVE NEW MARKER CALLED!")
  //     res();
  //   })
  // },
  functionToUpdateMap: function (obj) {
    return new Promise((res, rej) => {
      console.log("UPDATING MAP CALLED!")
      res();
    })
  },
  functionToDeleteMap: function (obj) {
    return new Promise((res, rej) => {
      console.log("DELETING MAP CALLED!")
      res();
    })
  },
  functionToUpdatePin: function (obj) {
    return new Promise((res, rej) => {
      console.log("UPDATING PIN CALLED!")
      res();
    })
  },
  functionToDeletePin: function (obj) {
    return new Promise((res, rej) => {
      console.log("DELETING PIN CALLED!")
      res();
    })
  }

};

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

//cookie parser to get login id
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const exploreRoutes = require("./routes/explore");
const profileRoutes = require("./routes/profile");
const editRoutes = require("./routes/edit");
const createRoutes = require("./routes/create");
const indexRoutes = require("./routes/index");
const logoutRoutes = require("./routes/logout");

// Mount all resource routes
app.use("/explore", exploreRoutes(db, axios, environment));
app.use("/profile", profileRoutes(db, axios, environment));
app.use("/edit", editRoutes(db, axios, environment));
app.use("/create", createRoutes(db, axios, environment));
app.use("/index", indexRoutes(db, axios, environment));
app.use("/logout", logoutRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.redirect('/index');
});
// app.get("/", (req, res) => {
//   res.render("/profile.ejs");
// });

// app.get("/", (req, res) => {
//   res.render("profile");
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
