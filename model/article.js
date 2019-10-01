const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    // * Title
    // * link
    // * image
    // * summary

    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    },
    link: {
        type: String,
        trim: true,
        required: "URL is Required"
    },
    image: {
        type: String,
        trim: true,
        required: "image is Required"
    },
    summary: {
        type: String,
        trim: true,
        required: "Summary is Required"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;