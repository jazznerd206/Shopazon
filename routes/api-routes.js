var db = require("../models");

module.exports = function (app) {

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
                $or: {
                    name: {
                        $like: '%' + req.params.keyword + '%'
                    },
                    description: {
                        $like: '%' + req.params.keyword + '%'
                    }
                }
            }
        }).then(function (products) {
            if (!products || !products.length) {
                res.render('partials/productsResults',
                    {
                        layout: false,
                        products: products,
                        noResults: true
                    }

                );
            }
            else {
                res.render('partials/productsResults',
                    {
                        layout: false,
                        products: products,
                        noResults: false
                    }

                );
            }
        });
    });


    app.get("/api/products/department/:id", function (req, res) {
        db.Product.findAll({
            where:
            {
                DepartmentId: req.params.id,
            },
            include: [db.Department]
        }).then(function (products) {
            if (!products || !products.length) {
                res.render('partials/productsResults',
                    {
                        layout: false,
                        products: products,
                        noResults: true
                    }

                );
            }
            else {
                res.render('partials/productsResults',
                    {
                        layout: false,
                        products: products,
                        noResults: false
                    }

                );
            }
        });
    });


    app.get("/api/product/:id", function (req, res) {
        // 2. Add a join here to include the Department who wrote the Products

        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Department]
        }).then(function (product) {
            res.render('partials/productDetails',
                {
                    layout: false,
                    product_name: product.name,
                    product_description: product.description,
                    product_image: product.image,
                    product_price: product.price,
                    department_name: product.Department.name

                }
            );
        });
    });



}