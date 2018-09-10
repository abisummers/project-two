const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//link to profile page. Can be moved later
router.get("/profile", (req, res, next) => {
  res.render("profile.hbs");
});

module.exports = router;
