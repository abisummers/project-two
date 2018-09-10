//passport set up
const passport = require("passport");
//const User = require("../../models/user-model.js");

//serializeUser() defines what user details to save in the session
//happens when you log in successfully
passport.serializeUser((userDoc, done) => {
  console.log("saved user Id to session💾");

  //'null' means everything went well - null errors
  done(null, userDoc._id);
});

//deserializeUser() defines how to retrieve the user info from database
//happens automatically on every request after you have logged in
passport.deserializeUser((userId, done) => {
  console.log("💼 data retreived");

  User.findById(userId)
    .then(userDoc => {
      done(null, userDoc);
    })
    .catch(err => done(err));
});

function passportSetup(app) {
  //set up involving app. add passport properties and methods to request object
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    //make req.user accessibme inside all hbs files as current user
    res.locals.currentUser = req.user;
    next();
  });
}

module.exports = passportSetup;
