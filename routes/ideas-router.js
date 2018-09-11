const express = require("express");
const router = express.Router();
const Idea = require("../models/idea-model.js");

//------------------------------IDEA LIST ------------------------

router.get("/ideas", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }
  Idea.find()
    .then(result => {
      res.locals.ideaArray = result;
      res.render("ideas-views/ideas-list.hbs");
    })
    .catch(err => next(err));
});

//------------------------DETAIL PAGE -----------------------------

router.get("/ideas/:ideaId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }

  const { ideaId } = req.params;

  Idea.findById(ideaId)
    .populate("user")
    .then(ideaDoc => {
      res.locals.myIdea = ideaDoc;
      res.render("ideas-views/idea-details.hbs");
      // res.send(ideaDoc);
    })
    .catch(err => next(err));
});

//------------------------------ADD ITEMS -----------------------

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
      const { _id } = ideaDoc;
      req.flash("success", "Idea created successfully!");
      res.redirect(`/ideas/${_id}`);
      // res.send(ideaDoc);
    })
    .catch(err => next(err));
});

module.exports = router;
