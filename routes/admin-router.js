const express = require("express");

const User = require("../models/user-model.js");

const router = express.Router();


router.get("/admin/users", (req, res, next) => {
  if(!req.user || req.user.role !== "admin"){
    req.flash("error", "Only admins can do that");
    res.redirect("/");
    return;
  }
  User.find()
    .sort({ role: 1, createdAt: 1})
    .then(userResults => {
      res.locals.userArray = userResults;
      res.render("admin-views/users-list.hbs");
    })
    .catch (err => next(err));
});

module.exports = router;