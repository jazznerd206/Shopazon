var db = require("../models");
var path = require("path");

module.exports = function (app) {
    // Load Landing Page
    app.get("/", function (req, res) {
        if (req.user) {
            res.render("index", {
                authenticated: true,
            });
        }
        else {
            res.render("index", {
                authenticated: false,
            });
        }
    });


    // Load myCart Page
    app.get("/mycart", function (req, res) {
        if (req.user) {
            res.render("mycart", {
                authenticated: true,
                userName: "GouriSri"
            });
        }
        else {
            res.render("mycart", {
                authenticated: false,
            });
        }
    });

    // Load myCart Page
    app.get("/product/:id", function (req, res) {
        if (req.user) {
            res.render("product", {
                authenticated: true,
                userName: "GouriSri",
                
            });
        }
        else {
            res.render("product", {
                authenticated: false,
                
            });
        }
    });

    // Load myCart Page
    app.get("/products", function (req, res) { 
        if (req.user) {
            res.render("products", {
                authenticated: true,
                userName: "GouriSri",                
            });
        }
        else {
            res.render("products", {
                authenticated: false,
               
            });
        }
    });



    // app.get("*", function(req, res) {
    //     res.render("404");
    //   });
}