const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date },
  picture: { 
    type: String,
    default: "https://i.giphy.com/media/4jHXZ9aIKFaUM/giphy.webp"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true
});

ideaSchema.virtual("getDeadline").get(function() {
  return moment(this.deadline).format("MMM DD YYYY");
});

const Idea = mongoose.model("Idea", ideaSchema);


module.exports = Idea; 