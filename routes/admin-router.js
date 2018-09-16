const express = require("express");

const User = require("../models/user-model.js");

const router = express.Router();

//------------------ADMIN HOMEPAGE-------------------------------------------

router.get("/admin/homepage", (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    req.flash("error", "Only admins can access this page");
    res.redirect("/");
    return;
  }

  res.render("admin-views/admin-homepage.hbs");
});

//------------------VERIFIED USERS LIST---------------------------------------
router.get("/admin/verified-users", (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    req.flash("error", "Only admins can access this page");
    res.redirect("/");
    return;
  }
  User.find({ verified: { $eq: true } })
    .sort({ role: 1, createdAt: 1 })
    .then(userResults => {
      res.locals.userArray = userResults;
      res.render("admin-views/verified-users-list.hbs");
    })
    .catch(err => next(err));
});

//-----------------NON VERIFIED USERS LIST-------------------------------------
router.get("/admin/non-verified-users", (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    req.flash("error", "Only admins can access this page");
    res.redirect("/");
    return;
  }
  User.find({ verified: { $eq: false } })
    .sort({ createdAt: 1 })
    .then(userResults => {
      res.locals.userArray = userResults;
      res.render("admin-views/non-verified-users-list.hbs");
    })
    .catch(err => next(err));
});

//-----------------DELETE A USER-----------------------------------------
router.get("/admin/:profileId/delete", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }

  if (!req.user.verified) {
    req.flash("error", "You must be approved by the admin to see this page");
    res.redirect("/home");
    return;
  }

  const { profileId } = req.params;

  User.findByIdAndRemove(profileId)
    .then(profileDoc => {
      res.redirect("/admin/verified-users");
    })
    .catch(err => next(err));
});

//-----------------APPROVE A USER----------------------------------------

router.get("/admin/:profileId/approve", (req, res, next) => {
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

  const { profileId } = req.params;

  User.findByIdAndUpdate(
    profileId,
    { $set: { verified: true } },
    { runValidators: true }
  )
    .then(userDoc => {
      //save a flash message to display in the HOME page
      req.flash("success", "User approved");
      res.redirect("/admin/non-verified-users");
    })
    .catch(err => next(err));
});

module.exports = router;
