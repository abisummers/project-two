const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//link to profile
router.get("/profile", (req, res, next) => {
  res.render("profile/profile.hbs");
});

module.exports = router;
