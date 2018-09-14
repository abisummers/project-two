const express = require("express");
const router = express.Router();
const User = require("../models/user-model.js");
const Idea = require("../models/idea-model.js");
const Project = require("../models/project-model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//-----------------------------PROFILE--------------------------------------------------
//link to profile
router.get("/profile", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }

  if (!req.user.verified) {
    req.flash("error", "You must be approved by the admin to see this page");
    res.redirect("/");
    return;
  }


  Project.find({author:req.user._id})
    .then(result => {
      res.locals.projectArray = result;
      Idea.find({author:req.user._id})
        .then(result => {
          res.locals.ideaArray = result;
          res.render("profile/profile.hbs");
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});






module.exports = router;
