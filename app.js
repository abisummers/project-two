require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

//additional three npm packages installed for flash messages and sessions
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

//aquiring passport
const passportSetup = require("./config/passport/passport-setup.js");

mongoose
  .connect(
    "mongodb://localhost/project-platform",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//extra settings from npm packages installed later
app.use(
  session({
    //SECRET - a string that is different for every app
    secret: "project two",
    saveUninitialized: true,
    resave: true,

    //use connect-mongo to store session info inside mongoDB
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);

//set up passport after session set up - passport uses sessions
passportSetup(app);

//allows flash messages in routes with req.flash()
app.use(flash());
app.use((req, res, next) => {
  //makes the message accessible inside hbs files as messages
  res.locals.messages = req.flash();
  //needed or the app wont work.
  next();
});

// default value for title local
app.locals.title = "Ironhack Portal";

const index = require("./routes/index");
app.use("/", index);

const ideaRouter = require("./routes/ideas-router");
app.use("/", ideaRouter);

const projectRouter = require("./routes/projects-router");
app.use("/", projectRouter);

module.exports = app;
