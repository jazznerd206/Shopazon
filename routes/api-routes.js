var db = require("../models");
var fs = require('fs');
var passport = require("../config/passport");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
var stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
var stripeSecretKey = process.env.STRIPE_SECRET_KEY;

var stripe = require('stripe')(stripeSecretKey);

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

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json("/");
    });

    app.post("/api/signup", function (req, res) {
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.redirect("/");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });

    app.get("/api/logout", function (req, res) {
        req.logout();
        res.redirect("/");
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


    // app.get("/api/indexProducts", function (req, res) {
    //     db.Product.findAll({
    //         where: {
    //             name: {
    //                 $like: 'A%',
    //             }
    //         },
    //         include: [db.Department]
    //     }).then(function (products) {
    //         console.log("A products "+products); 
    //         res.render('partials/indexproducts',
    //             {
    //                 layout: false,
    //                 orbitProducts: products,
    //                 // latestProducts: products,
    //                 // seasonalProducts: products,

    //             }

    //         );

    //     });
    // });



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


                });
        });
    })


    app.post('/api/purchase', function (req, res) {

        stripe.charges.create({
            amount: 1000,
            source: req.body.stripeTokenId,
            currency: 'usd'
        }).then(function () {

            fs.writeFile("cartItems.json", "", function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    res.json(err);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    res.json({ message: 'Order succesfully placed. No more items in your cart!' });
                }

            });

        }).catch(function (err) {
            console.log("ERROR" + err);
            console.log('Charge Fail')
            res.status(500).end()
        })
    })


    app.post("/api/mycart", function (req, res) {
        //write data to file      
        console.log("in post request");
        var cartItems = req.body.carts;
        console.log("cart itesm read from request" + JSON.stringify(cartItems));

        fs.writeFile("cartItems.json", JSON.stringify(cartItems), function (err) {

            // If an error was experienced we will log it.
            if (err) {
                res.json(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                res.json({ message: 'Successfully purchased items' })
            }

        });
    })


    app.get("/api/mycart", function (req, res) {
        fs.readFile('cartItems.json', function (error, data) {
            if (error) {
                res.status(500).end()
            } else {
                cartItems = JSON.parse(data);

                carts = cartItems.filter(function (value) {
                    return value !== "" && value !== null;
                });

                console.log("final carts " + JSON.stringify(carts));
                prices = carts.map(function (cart) { return cart.Product.price * cart.quantity; });
                subTotalValue = 0;
                for (var i = 0; i < prices.length; i++) {
                    subTotalValue = parseFloat(subTotalValue) + prices[i];
                }
                taxValue = subTotalValue * 0.2;
                shippingValue = subTotalValue * 0.1;
                totalFinalValue = subTotalValue + taxValue + shippingValue;
                fs.writeFile('cartItems.json', '', function(){console.log('content clear done')});

                res.render('partials/cartDetails',
                    {
                        layout: false,
                        cart_products: carts,
                        stripePublicKey: stripePublicKey,
                        prices: prices,
                        totalFinalValue: totalFinalValue,
                        subTotalValue: subTotalValue,
                        shippingValue: shippingValue,
                        taxValue: taxValue

                    });
            }
        });












    })
}






















