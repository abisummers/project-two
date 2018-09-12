const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date },
    pictureUrl: { type: String },
    linkUrl: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

projectSchema.virtual("isAdmin").get(function() {
  return this._id === currentUser.id;
});

// userSchema.virtual("isAdmin").get(function() {
//   return this.role === "admin";
// });
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
