require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user-model.js");
const bcrypt = require("bcrypt");

mongoose
  .connect(
    process.env.MONGODB_URI,
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

const ideaData = [
  {
    name: "Funky shapes",
    description: "To create a website with this effect",
    deadline: " ",
    pictureUrl: "https://media.giphy.com/media/MvovQGsMBY9H2/giphy.gif",
    author: {}
  },
  {
    name: "",
    description: "",
    deadline: " ",
    pictureUrl: "https://media.giphy.com/media/hS3ESVXKy595K/giphy.gif",
    author: {}
  }
];

User.create(userData)
  .then(userResult => {
    console.log(`created ${userResult.length} users`);
  })
  .catch(err => {
    console.log("oops, there was an error", err);
  });
