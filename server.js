// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3000;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams); //comment this out when testing with below
// db.connect(); //comment this out when testing with below

//THIS IS PURELY FOR TESTING THAT DB CALLS WORK WITH ROUTES-------------------------
const { getUserById } = require("./routes/database");
const pool = new Pool(dbParams);
pool.connect();
const db = {

  getUserById: getUserById

  //   functionToQuerySomeMapsToDisplayFromDatabase: function () {
  //     return new Promise((resolve, reject) => {
  //       console.log("results from functionToQuerySomeMapsToDisplayFromDatabase");
  //       resolve();
  //     });
  //   },

  //   functionToQueryForAMapWithThisId: function (stuff) {
  //     return new Promise((resolve, reject) => {
  //       console.log("results from functionToQueryForAMapWithThisId and the passed in variable is: ", stuff);
  //       resolve();
  //     });
  //   },

  //   createMap: function (objToPass) {
  //     return new Promise((resolve, reject) => {
  //       console.log("results from createMap and the passed in obj is: ", objToPass);
  //       resolve();
  //     });
  //   },

  //   popularMaps: function () {
  //     return new Promise((resolve, reject) => {
  //       console.log("results for popular maps!");
  //       resolve();
  //     });
  //   },

  //   querySelectProfile: function () {
  //     return new Promise((resolve, reject) => {
  //       console.log("I'm a profile!!!");
  //       resolve();
  //     });
  //   }
};
//----------------------------------------------------------------------------------

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

// Mount all resource routes
app.use("/explore", exploreRoutes(db));
app.use("/profile", profileRoutes(db));
app.use("/edit", editRoutes(db));
app.use("/create", createRoutes(db));
app.use("/index", indexRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.redirect('/index');
});
app.get("/", (req, res) => {
  res.render("/profile.ejs");
});

app.get("/", (req, res) => {
  res.render("profile");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
