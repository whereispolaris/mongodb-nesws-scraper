// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const Article = require("./model/Article");

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connect(db, (error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("DB Connection successfull");
    }
});

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
    axios.get("https://www.nytimes.com/section/world")
        .then(response => {
            const $ = cheerio.load(response.data);

            $(".css-1l4spti").each((i, element) => {
                var title = $(element).children("a").children("h2").text();
                var link = "https://www.nytimes.com/" + $(element).children("a").attr("href");
                var image = $(element).children("a").children(".css-79elbk").children("figure").attr("itemid");
                var summary = $(element).children("a").children(".css-1echdzn").text();

                scrapeData.push({
                    title: title,
                    link: link,
                    image: image,
                    summary: summary
                });
            });
            res.json(scrapeData);
        });
    // This is not working yet 
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});