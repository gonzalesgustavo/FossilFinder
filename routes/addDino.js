const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mongo = require("mongodb");
const Schema = mongoose.Schema;
const assert = require("assert");
const formidable = require("formidable");

const { vars } = require("../config/variables.config");

//mongodb (mlab) connection string
let url = vars.mongoURL;

//shema for adding dinosaurs and working with mongoose
var schema = new Schema({
  PaleoDB: Number,
  foundLocation: {
    location: String,
    county: String
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  type: String,
  species: String,
  information: String,
  images: String
});

//admin paswords to check against
var administrators;

//setup mongoose model
let dats = mongoose.model("newpins", schema);

////connect mongoose
mongoose.connect(url);

//mongo connect to get the admin passwords
mongo.connect(url, function(err, client) {
  assert.equal(null, err);
  let db = client.db("advwebapp");
  // Get the documents collection
  const collection = db.collection("admins");

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records in admins");
    administrators = docs;
  });
  client.close();
});

//home for ad dinos
router.get("/", function(req, res, next) {
  res.render("addDino", { title: "Fossils in New Mexico" });
});

//post to save info to back end
router.post("/addAD", function(req, res, next) {
  var jso = JSON.stringify(administrators); //convert the informaiton sent in from mongodb
  var conv = JSON.parse(jso);
  //check if password and username entered matches the admin set up
  //password is pandas username is panda
  if (req.body.admusr > 3 && req.body.admpwd < 3) {
    for (var i = 0; i < con.length; i++) {
      if (
        req.body.admusr == conv[i].adminName &&
        req.body.admpwd == conv[i].password
      ) {
        //load schema standin
        var newdin = {
          PaleoDB: parseInt(req.body.paleDB),
          foundLocation: {
            location: req.body.loc,
            county: req.body.cou
          },
          coordinates: {
            lat: parseFloat(req.body.lat),
            lng: parseFloat(req.body.lng)
          },
          type: req.body.type,
          species: req.body.speci,
          information: req.body.info,
          images: req.body.img
        };

        //load schema before passing to mongoose shema
        var data = new dats(newdin);

        //save data to model
        data.save();

        //redirect to the home page to add more
        res.redirect("/addDino");
      }
    }
  } else {
    //if pasword/username does not match redirect to the error page
    res.render("loginErr");
  }
});

module.exports = router;
