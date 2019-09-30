// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Database Model

// Initialize Express
const app = express();

var PORT = process.env.PORT || 3000;

// Public Static Directory
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

});