const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const Project = require("../models/project-model.js");
const Idea = require("../models/idea-model.js");
const fileUploader = require("../config/file-uploader.js");

//------------------PROFILE SETTINGS -----------------------

router.get("/profile-settings", (req, res, next) => {
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

  res.render("profile/profile-settings.hbs");
});

router.post(
  "/process-profile-settings",
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

    var changes = {
      fullName,
      email,
      course,
      startDate,
      aboutUser,
      encryptedPassword
    };

    let avatar;
    if (req.file) {
      avatar = req.file.secure_url;
      changes.avatar = avatar;
    }
    console.log(changes);

    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: changes
      },
      { runValidators: true }
    )
      .then(userDoc => {
        req.flash("success", "settings saved!!");
        res.redirect("/profile");
      })
      .catch(err => next(err));
  }
);

//------------------EDIT PROJECTS -----------------------

router.get("/project-settings/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
  }

  if (!req.user.verified) {
    req.flash("error", "You must be approved by the admin to see this page");
    res.redirect("/");
    return;
  }

  Project.findById(projectId)
    .then(projectDoc => {
      res.locals.myProject = projectDoc;
      res.render("projects-views/project-settings.hbs");
    })
    .catch(err => next(err));
});

router.post(
  "/process-project-settings/:projectId",
  fileUploader.single("imageUpload"),
  (req, res, next) => {
    const { projectId } = req.params;
    const { name, description, deadline, linkUrl } = req.body;

    var changes = {
      name,
      description,
      deadline,
      linkUrl
    };

    let picture;
    if (req.file) {
      picture = req.file.secure_url;
      changes.picture = picture;
    }

    Project.findByIdAndUpdate(
      projectId,
      { $set: changes },
      { runValidators: true }
    )
      .then(projectDoc => {
        res.redirect(`/projects/${projectId}`);
      })
      .catch(err => next(err));
  }
);

//-----------------------EDIT IDEAS -------------------------

router.get("/idea-settings/:ideaId", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see this page");
    res.redirect("/");
  }

  if (!req.user.verified) {
    req.flash("error", "You must be approved by the admin to see this page");
    res.redirect("/");
    return;
  }

  const { ideaId } = req.params;

  Idea.findById(ideaId)
    .then(ideaDoc => {
      res.locals.myIdea = ideaDoc;
      res.render("ideas-views/idea-settings.hbs");
    })
    .catch(err => next(err));
});

router.post(
  "/process-idea-settings/:ideaId",
  fileUploader.single("pictureUpload"),
  (req, res, next) => {
    const { ideaId } = req.params;
    const { name, description, deadline } = req.body;

    var change = {
      name,
      description,
      deadline
    };

    let picture;
    if (req.file) {
      picture = req.file.secure_url;
      change.picture = picture;
    }

    console.log(change);

    Idea.findByIdAndUpdate(
      ideaId,
      {
        $set: change
      },
      { runValidators: true }
    )
      .then(ideaDoc => {
        res.redirect(`/ideas/${ideaId}`);
      })
      .catch(err => next(err));
  }
);

module.exports = router;
