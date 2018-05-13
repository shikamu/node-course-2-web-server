"use strict";
exports.__esModule = true;
var express = require("express");
var hbs = require("hbs");
var fs = require("fs");
var port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(function (req, res, next) {
    var now = new Date().toString();
    var log = now + ": " + req.method + " " + req.url;
    console.log(log);
    fs.appendFile("server.log", log + "\n", function (err) {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});
app.use(function (req, res, next) {
    //res.render("maintenance.hbs");
    next();
});
app.use(express.static(__dirname + "/public"));
hbs.registerHelper("getCurrentYear", function () {
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt", function (text) {
    return text.toUpperCase();
});
app.get("/", function (request, response) {
    response.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website!"
    });
});
app.get("/about", function (req, res) {
    res.render("about.hbs", {
        pageTitle: "About Page"
    });
});
app.get("/bad", function (req, res) {
    res.send({
        errorMessage: "bad request"
    });
});
app.listen(3000, function () {
    console.log("Server is up on port 3000");
});
