const express = require("express");
const router = express.Router();
const Idea = require("../models/idea-model.js");

router.get("/ideas", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  res.render("ideas-views/ideas-list.hbs");
});

router.get("/ideas/:ideaId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }

  const { ideaId } = request.params;

  Idea.findById({ ideaId })
    .then(ideaDoc => {
      res.locals.myIdea = ideaDoc;
      res.render("ideas-views/idea-details.hbs");
    })
    .catch(err => next(err));
});

router.get("/add-idea", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  res.render("ideas-views/idea-form.hbs");
});

router.post("/process-idea", (req, res, next) => {
  const { name, description, deadline, pictureUrl } = req.body;
  const user = req.user._id;

  Idea.create({ name, description, deadline, pictureUrl, user })
    .then(ideaDoc => {
      req.flash("success", "Idea created successfully!");
      res.redirect("/ideas");
    })
    .catch(err => next(err));
});

module.exports = router;
