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
  const { fullName, email, userPassword } = req.body;
  const encryptedPassword = bcrypt.hashSync(userPassword, 10);

  User.create({ fullName, email, encryptedPassword })
    .then(userDoc => {
      res.redirect("/");
    })
    .catch(err => next(err));
});

//-------------------------LOG IN -------------------------------
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { userPassword, email } = req.body;

  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        res.redirect("/index.hbs");
        return;
      }

      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(userPassword, encryptedPassword)) {
        res.redirect("/index.hbs");
        return;
      }
      req.logIn(userDoc, () => {
        res.redirect("/");
      });
    })
    .catch(err => next(err));
});

//-----------------LOG OUT -------------------------------

module.exports = router;
