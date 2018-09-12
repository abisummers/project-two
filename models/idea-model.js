const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date },
  pictureUrl: { type: String },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true
});


const Idea = mongoose.model("Idea", ideaSchema);


module.exports = Idea; 