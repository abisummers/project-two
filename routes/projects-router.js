const express = require("express");
const router = express.Router();
const Project = require("../models/project-model.js");
const User = require("../models/user-model.js");
const Comment = require("../models/comment-model.js");
const fileUploader = require("../config/file-uploader.js");

//-------------------PROJECT LIST PAGE ----------------------

router.get("/projects", (req, res, next) => {
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

  Project.find()
    .then(result => {
      res.locals.projectArray = result;
      res.render("projects-views/project-list.hbs");
    })
    .catch(err => next(err));
});

//-------------------PROJECT DETAILED PAGE ----------------------

router.get("/projects/:projectId", (req, res, next) => {
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

  const { projectId } = req.params;

  Project.findById(projectId)
    .populate("author")
    .then(projectDoc => {
      res.locals.myProject = projectDoc;
      res.locals.isOwner =
        req.user._id.toString() === projectDoc.author._id.toString();

      Comment.find({ project: projectId })
        .populate("author")
        .then(commentList => {
          res.locals.commentArray = commentList;
          res.render("projects-views/project-details.hbs");
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

//---------------------ADD A PROJECT ---------------------

router.get("/add-project", (req, res, next) => {
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

  res.render("projects-views/project-form.hbs");
});

router.post("/process-project", fileUploader.single("imageUpload"), (req, res, next) => {
  const { name, description, deadline, linkUrl } = req.body;
  const author = req.user._id;
  let picture;
    if (req.file) {
      picture = req.file.secure_url;
    }

  Project.create({ name, description, deadline, picture, linkUrl, author })
    .then(projectDoc => {
      const { _id } = projectDoc;
      req.flash("success", "Project created successfully!");
      res.redirect(`/projects/${_id}`);
    })
    .catch(err => next(err));
});

//------------------DELETE PROJECT-------------------------------------
router.get("/projects/:projectId/delete", (req, res, next) => {
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
  
  const { projectId } = req.params;

  Project.findByIdAndRemove(projectId)
    .then(projectDoc => {
      res.redirect("/projects");
    })
    .catch(err => next(err));
});

//---------------------ADD A COMMENT---------------------------------
router.post("/projects/:projectId/process-comment", (req, res, next) => {
  const { content } = req.body;
  const author = req.user._id;
  const project = req.params.projectId;

  Comment.create({ author, content, project })
    .then(commentDoc => {
      res.redirect(`/projects/${project}`);
    })
    .catch(err => next(err));
});

module.exports = router;
