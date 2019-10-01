const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    // * Title
    // * Summary
    // * URL

    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    },
    summary: {
        type: String,
        trim: true,
        required: "Summary is Required"
    },

    url: {
        type: String,
        trim: true,
        required: "URL is Required"
    },
    image: {
        type: String,
        trim: true,
        required: "URL is Required"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;