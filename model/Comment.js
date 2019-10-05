const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

const commentSchema = new Schema({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    date: String,
    comment: string
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Article;