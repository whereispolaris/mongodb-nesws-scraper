// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", error => {
    console.log("Mongoose Error: ", error)
});

db.once("open", () => {
    console.log("Mongoose connection successful");
});


// Database Model
const Article = require('./model/Article.js');

// Initialize Express
const app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 3000;

// Public Static Directory
app.use(express.static('public'));


app.post("/submit", (req, res) => {
    Article.create(req.body)
        .then(dbArticle => {
            res.json(dbArticle);
        })
});


app.get("/", (req, res) => res.send('Hello World!'));

app.get("/all", (req, res) => {
    Article.find({})
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        })
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});