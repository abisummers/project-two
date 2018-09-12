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

const projectData = [
  {
    name: "Spacetaker",
    description: "A spaceship that takes cows from earth",
    deadline: "14/09/2018",
    pictureUrl: "https://media.giphy.com/media/26BoCVdjSJOWT0Fpu/giphy.gif",
    linkUrl: "",
    author: {}
  },
  {
    name: "",
    description: "",
    deadline: " ",
    pictureUrl: "",
    linkUrl: "",
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
