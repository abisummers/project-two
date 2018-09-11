const express = require("express");
const router = express.Router();
const Project = require("../models/project-model.js");

router.get("/projects", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  Project.find()
    .then(result => {
      res.locals.projectArray = result;
      res.render("projects-views/project-list.hbs");
    })
    .catch(err => next(err));
});

router.get("/projects/:projectId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }

  const { projectId } = req.params;

  Project.findById(projectId)
    .then(projectDoc => {
      res.locals.myProject = projectDoc;
      res.render("projects-views/project-details.hbs");
    })
    .catch(err => next(err));
});

router.get("/add-project", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  res.render("projects-views/project-form.hbs");
});

router.post("/process-project", (req, res, next) => {
  const { name, description, deadline, pictureUrl, linkUrl } = req.body;
  const user = req.user._id;

  Project.create({ name, description, deadline, pictureUrl, linkUrl, user })
    .then(projectDoc => {
      const { _id } = ideaDoc;
      req.flash("success", "Project created successfully!");
      res.redirect(`/projects/${_id}`);
    })
    .catch(err => next(err));
});

module.exports = router;
