const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const passport = require("passport");
const router = express.Router();

//---------------------SIGN UP -----------------------------

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const { fullName, email, userPassword, course, startDate } = req.body;
  const encryptedPassword = bcrypt.hashSync(userPassword, 10);

  User.create({ fullName, email, course, encryptedPassword, startDate })
    .then(userDoc => {
      req.flash("success", "account created successfully");
      res.redirect("/");
    })
    .catch(err => next(err));
});

//-------------------------LOG IN -------------------------------
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

router.get("/home", (req, res, next) => {
  res.render("homepage.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { userPassword, email } = req.body;

  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        req.flash("error", "You must be logged in to see this page");
        res.redirect("/index.hbs");
        return;
      }
      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(userPassword, encryptedPassword)) {
        req.flash("error", "You must be logged in to see this page");
        res.redirect("/index.hbs");
        return;
      }
      req.logIn(userDoc, () => {
        req.flash("success", "you are logged in");
        res.redirect("/home");
      });
    })
    .catch(err => next(err));
});

//-----------------LOG OUT -------------------------------

router.get("/logout", (req, res, next) => {
  //req.logOut() is a passport method
  req.logOut();
  req.flash("success", "logout successful");
  res.redirect("/");
});

module.exports = router;