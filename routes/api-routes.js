var db = require("../models");

module.exports = function (app) {

    // DEpartments Routes
    app.get("/api/department", function(req, res) {
        db.Department.findAll({}).then(function(departments) {
         res.json(departments);
        });
      });


    

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        //console.log("USER     " + req.user);
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            ////console.log(res.json());
            res.json({
                email: req.user.email,
                name: req.user.name,
                id: req.user.id
            });
        }
    });


    app.get("/api/products/search/:keyword", function (req, res) {
        db.Product.findAll({
            where:
            {               
                    
                        description: {
                            $like: '%' + req.params.keyword + '%'
                        }
                    
                
            }

        }).then(function (products) {
            console.log("Products at api routes" + JSON.stringify(products));
            //res.json(products);

            // res.render("productsResults", {
            //     products: products
            // });

            res.render('partials/productsResults',
                {
                    layout: false,
                    products: products
                }

            );
        });
    });

}