const express = require('express');
const router  = express.Router();
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
    const {ideaId} = request.params;
    response.locals.myIdeaId= ideaId;
    res.render("ideas-views/idea-details.hbs");
});


router.get("/add-idea", (req, res, next) => {
    if (!req.user) {
      req.flash("error", "You must be logged in to see this page");
      res.redirect("/");
      return; 
    }
    res.render("ideas-views/idea-form.hbs");
});




module.exports = router;