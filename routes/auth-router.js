const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const passport = require("passport");
const router = express.Router();
const fileUploader = require("../config/file-uploader.js");
const { sendSignupMail } = require("../config/nodemailer-setup.js");

//---------------------SIGN UP -----------------------------

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post(
  "/process-signup",
  fileUploader.single("imageUpload"),
  (req, res, next) => {
    const {
      fullName,
      email,
      userPassword,
      course,
      startDate,
      aboutUser
    } = req.body;
    const encryptedPassword = bcrypt.hashSync(userPassword, 10);

    User.findOne({ email })
      .then(userEmail => {
        if (userEmail) {
          req.flash("error", "There is already an account using this email");
          res.redirect("/");
          return;
        }
        let avatar;
        if (req.file) {
          avatar = req.file.secure_url;
        }

        return User.create({
          fullName,
          email,
          course,
          encryptedPassword,
          startDate,
          avatar,
          aboutUser
        }).then(userDoc => {
          return sendSignupMail(userDoc).then(() => {
            req.flash("success", "Account created successfully");
            res.redirect("/");
          });
        });
      })
      .catch(err => next(err));
  }
);

//-------------------------LOG IN -------------------------------
router.get("/", (req, res, next) => {
  res.locals.toBeApproved = !req.user.verifed;
  res.render("index.hbs");
});

router.get("/home", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
    return;
  }

  if (!req.user.verified) {
    req.flash("error", "You must be approved by the admin to access this website");
    res.redirect("/");
    return;
  }

  User.find({ verified: { $eq: false } })
    .then(userVerified => {
      // res.send(userVerified);
      res.locals.userVerifiedNumber = userVerified.length;
      res.render("homepage.hbs");
    })
    .catch(err => next(err));
});

router.post("/process-login", (req, res, next) => {
  const { userPassword, email } = req.body;

  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        req.flash("error", "There is no account related to this email");
        res.redirect("/");
        return;
      }
      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(userPassword, encryptedPassword)) {
        req.flash("error", "Wrong password");
        res.redirect("/");
        return;
      }
      req.logIn(userDoc, () => {
        req.flash("success", "Successful login");
        res.redirect("/home");
      });
    })
    .catch(err => next(err));
});

//-----------------LOG OUT -------------------------------

router.get("/logout", (req, res, next) => {
  //req.logOut() is a passport method
  req.logOut();
  req.flash("success", "Successful logout");
  res.redirect("/");
});

module.exports = router;
