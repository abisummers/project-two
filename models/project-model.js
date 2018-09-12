const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date },
  pictureUrl: { type: String },
  linkUrl: { type: String },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true
});


const Project = mongoose.model("Project", projectSchema);

module.exports = Project; 