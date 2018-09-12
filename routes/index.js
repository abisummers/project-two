const express = require("express");
const router = express.Router();
const User = require("../models/user-model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//link to profile
router.get("/profile", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  // res.send(currentUser);
  res.render("profile/profile.hbs");
});

module.exports = router;
