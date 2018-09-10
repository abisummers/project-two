const express = require('express');
const router  = express.Router();
const Project = require("../models/project-model.js");


router.get("/projects", (req, res, next) => {
    if (!req.user) {
      req.flash("error", "You must be logged in to see this page");
      res.redirect("/");
      return; 
    }
    res.render("projects-views/projects-list.hbs");
});

router.get("/projects/:projectId", (req, res, next) => {
    if (!req.user) {
      req.flash("error", "You must be logged in to see this page");
      res.redirect("/");
      return; 
    }
    const {projectId} = request.params;
    response.locals.myProjectId= projectId;
    res.render("project-views/project-details.hbs");
});


router.get("/add-project", (req, res, next) => {
    if (!req.user) {
      req.flash("error", "You must be logged in to see this page");
      res.redirect("/");
      return; 
    }
    res.render("projects-views/project-form.hbs");
});



module.exports = router;





