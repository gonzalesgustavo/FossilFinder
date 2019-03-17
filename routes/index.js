//required modules
const express = require("express");
const router = express.Router();
const mongo = require("mongodb").MongoClient;
const assert = require("assert");

const { vars } = require("../config/variables.config");

//mongodb (mlab) connection string
let url = vars.mongoURL;

//variables
let dinBones;
let newDinos;

//setup mongodb connection
mongo.connect(url, function(err, client) {
  assert.equal(null, err);

  let db = client.db("advwebapp"); //main database for project

  // Get the documents collection
  const collection = db.collection("dinobones");

  //det the documents from the db collection newpins
  const dcolection = db.collection("newpins");

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null); //handles error
    console.log("Found the following records in dinobones -- index");
    dinBones = docs; //load global for access elsewhere
  });

  //admin added dinos
  dcolection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log(
      "Found the following records in new pins -- admin added dinos in index "
    );
    newDinos = docs; //load global for access elsewhere
  });

  //close the connection
  client.close();
});

//view render route
router.get("/", function(req, res, next) {
  var jso = JSON.stringify(newDinos); // send the new dinos to the front
  res.render("index", {
    title: "Fossils in New Mexico",
    data: dinBones[0].newMexico,
    newdins: jso
  });
});

module.exports = router;
