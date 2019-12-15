var db = require("../models");

module.exports = function (app) {

    var products = [
        {
            id: 1,
            image: "http://lorempixel.com/output/technics-q-c-300-300-4.jpg",
            name: "Diapers",
            price: "15$",
            description: "Baby cleaning services",
            departmentName: "Baby Products"
        },
        {
            id: 2,
            image: "https://www.att.com/catalog/en/idse/Apple/Apple%20Watch%20Series%205%20-%2044mm/Space%20Gray%20Aluminum%20-%20Black%20Sport-hero-zoom.png",
            name: "Diapers2",
            price: "15$",
            description: "Baby cleaning services2",
            departmentName: "Baby Products2"
        },
        {
            id: 3,
            image: "https://imgbin.com/png/yUnpGqWb/cloth-diaper-infant-png",
            name: "Diapers3",
            price: "15$",
            description: "Baby cleaning services3",
            departmentName: "Baby Products3"
        },
        {
            id: 4,
            image: "http://lorempixel.com/output/technics-q-c-300-300-4.jpg",
            price: "15$",
            description: "Baby cleaning services4",
            departmentName: "Baby Products4"
        },
        {
            id: 5,
            image: "https://imgbin.com/png/yUnpGqWb/cloth-diaper-infant-png",
            name: "Diapers5",
            price: "15$",
            description: "Baby cleaning services5",
            departmentName: "Baby Products5"
        },
        {
            id: 6,
            image: "https://imgbin.com/png/yUnpGqWb/cloth-diaper-infant-png",
            name: "Diapers6",
            price: "15$",
            description: "Baby cleaning services6",
            departmentName: "Baby Products6"

        }
    ];

    // Load Landing Page
    app.get("/", function (req, res) {
        if (req.user) {
            res.render("index", {
                authenticated: true,
                userName: "GouriSri"
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
    app.get("/products/", function (req, res) {        
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