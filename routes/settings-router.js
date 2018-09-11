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

router.get("/project-settings/:projectId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "you must be logged in to see this page");
    res.redirect("/");
  }
  const { projectId } = req.params;
  res.locals.projectId = projectId;
  res.render("projects-views/project-settings.hbs");
});

router.post("/process-project-settings/:projectId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  const { projectId } = req.params;
  const { name, description, deadline, pictureUrl, linkUrl } = req.body;

  Project.findByIdAndUpdate(
    projectId,
    { $set: { name, description, deadline, pictureUrl, linkUrl } },
    { runValidators: true }
  )
    .then(projectDoc => {
      res.redirect(`/projects/${projectId}`);
    })
    .catch(err => next(err));
});

//-----------------------EDIT IDEAS -------------------------

router.get("/idea-settings/:ideaId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "you must be logged in to see this page");
    res.redirect("/");
  }
  const { ideaId } = req.params;
  res.locals.ideaId = ideaId;
  res.render("ideas-views/idea-settings.hbs");
});

router.post("/process-idea-settings/:ideaId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "you must be logged in to see this page");
    res.redirect("/");
    return;
  }

  const { ideaId } = req.params;
  const { name, description, deadline, pictureUrl } = req.body;

  Idea.findByIdAndUpdate(
    ideaId,
    { $set: { name, description, deadline, pictureUrl } },
    { runValidators: true }
  )
    .then(ideaDoc => {
      res.redirect(`/ideas/${ideaId}`);
    })
    .catch(err => next(err));
});

module.exports = router;
