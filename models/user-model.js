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
    aboutUser: { type: String },
    image: { type: String },
    course: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: "https://media.giphy.com/media/xULW8DcQMhlZFs6baU/giphy.gif"
    },
    encryptedPassword: { type: String },
    verified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      required: true,
      default: "normal"
    },
    startDate: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.virtual("isAdmin").get(function() {
  return this.role === "admin";
});

// userSchema.virtual("isVerified").get(function() {
//   return this.verified === "verified";
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
