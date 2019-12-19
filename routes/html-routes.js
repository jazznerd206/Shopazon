var db = require("../models");
var path = require("path");

module.exports = function (app) {
    // Load Landing Page
    app.get("/", function (req, res) {
        db.Product.findAll({
            // where: {
            //     $or: {
            //         name: {
            //             $like: 'A%',
            //         },
            //         name: {
            //             $like: 'F%',
            //         }
            //     }
            // },
            include: [db.Department]
        }).then(function (products) {
            console.log("A products " + products);
            var hbsObject = {
                authenticated: true,
                orbitProducts: products,
                seasonalProducts: products,
                latestProducts: products
            };
            if (req.user) {
                res.render("index", hbsObject);
            }
            else {
                hbsObject.authenticated = false;
                res.render("index", hbsObject);
            }
        });

    });


    app.get("/account", function (req, res) {
        if (req.user) {
            res.render("account", {
                authenticated: true,
                name: req.user.name,
                email: req.user.email
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