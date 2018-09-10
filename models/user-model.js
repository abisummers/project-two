const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/
  },
  encryptedPassword: { type: String },
  role: {
    type: String,
    enum: ["normal", "admin"],
    required: true,
    default: "normal"
  },
  verified: {
    type: String,
    enum: ["notVerified", "verified"],
    required: true,
    default: "notVerified"
  }
});

userSchema.virtual("isAdmin").get(function() {
  return this.role === "admin";
});

userSchema.virtual("isVerified").get(function() {
  return this.verified === "verified";
});

const User = ("User", userSchema);
module.exports = User;
