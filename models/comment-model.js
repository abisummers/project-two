const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    content: { type: String, required: true },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
}, {
  timestamps: true
});


const Comment = mongoose.model("Comment", commentSchema);


module.exports = Comment; 