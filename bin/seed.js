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

const userData = [
  {
    fullName: "a",
    email: "a@a.a",
    encryptedPassword: bcrypt.hashSync("a", 10),
    role: "admin"
  }
];

User.create(userData)
  .then(userResult => {
    console.log(`created ${userResult.length} users`);
  })
  .catch(err => {
    console.log("oops, there was an error", err);
  });
