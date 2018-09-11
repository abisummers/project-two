const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");

router.get("/profile-settings", (req, res, next) => {
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

module.exports = router;
