//required modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assert = require("assert");

const { vars } = require("../config/variables.config");

//mongodb (mlab) connection string
let url = vars.mongoURL;

let adminAdd = new Schema({
  username: String,
  password: String
});

let dats = mongoose.model("admins", adminAdd);

//view render route
router.get("/", function(req, res, next) {
  res.render("dinoAdmins");
});

router.post("/addAd", function(req, res, next) {
  var newADM = {
    username: req.body.username,
    password: req.body.password
  };

  //load schema before passing to mongoose shema
  var data = new dats(newADM);

  //save data to model
  data.save();

  res.redirect("/addDino");
});

module.exports = router;
