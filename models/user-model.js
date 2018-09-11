const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^.+@.+\..+$/
    },
    course: {
      type: String,
      required: true
    },
    encryptedPassword: { type: String },
    verified: {
      type: String,
      enum: ["notVerified", "verified"],
      //required: true,
      default: "notVerified"
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      // required: true,
      default: "normal"
    },
    startDate: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// userSchema.virtual("isAdmin").get(function() {
//   return this.role === "admin";
// });

// userSchema.virtual("isVerified").get(function() {
//   return this.verified === "verified";
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
