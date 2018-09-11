const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const Project = require("../models/project-model.js");
const Idea = require("../models/idea-model.js");

//------------------PROFILE SETTINGS -----------------------

router.get("/profile-settings", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "you must be logged in to see this page");
    res.redirect("/");
    return;
  }

  res.render("profile/profile-settings.hbs");
});

router.post("/process-profile-settings", (req, res, next) => {
  const { fullName, email, userPassword, course, startDate } = req.body;
  const encryptedPassword = bcrypt.hashSync(userPassword, 10);

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { fullName, email, course, startDate, encryptedPassword } },
    { runValidators: true }
  )
    .then(userDoc => {
      req.flash("success", "settings saved!!");
      res.redirect("/");
    })
    .catch(err => next(err));
});

//------------------EDIT PROJECTS -----------------------

router.get("/project-settings/", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "you must be logged in to see this page");
    res.redirect("/");
  }
  res.render("projects-views/project-settings.hbs");
});

router.post("/process-project-settings/:projectId", (req, res, next) => {
  const { projectId } = req.params;
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }

  const { name, description, deadline, pictureUrl, linkUrl } = req.body;

  Project.findById(projectId)
    .then(projectDoc => {})
    .catch(err => next(err));
});

//-----------------------EDIT IDEAS -------------------------

router.get("/idea-settings", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "you must be logged in to see this page");
    res.redirect("/");
    return;
  }
  res.render("ideas-views/idea-settings.hbs");
});

router.post("/process-idea-settings/:ideaId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  const { projectId } = req.params;
});

module.exports = router;
