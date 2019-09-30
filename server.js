// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

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

// Scrape Route
app.get("/scrape", (req, res) => {
    var scrapeData = [];
    scrapeData.push({
        title: "test title",
        link: "test link"
    });
    // This is not working / Should it be request instead of axios? 
    axios.get("https://www.nytimes.com/section/world")
        .then(resonse => {
            const $ = cheerio.load(html);
            // css-xei2dc Selects li elements
            $(".css-xei2dc").each((i, element) => {
                var title = $(this).children("a").text();
                var link = $(this).children("a").attr("href");
                if (title && link) {
                    console.log("title and link exist");
                    scrapeData.push({
                        title: title,
                        link: link
                    });
                }
            });
        })
    res.json(scrapeData)
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});