var db = require("../models");
var passport = require("../config/passport");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
  }
  var stripePublicKey=process.env.STRIPE_PUBLIC_KEY;
  var stripeSecretKey=process.env.STRIPE_SECRET_KEY;

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
            name:req.body.name,
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


    var carts=[
        {
            name:"Mustela",
            description:"Stress-Free Skin Care Simplify your baby's skin care routine while protecting against dry skin on baby's face, nose, cheeks, and lips. Use Mustela",
            price:5.00,
            image:"https://picsum.photos/id/100/2500/1656",
            quantity:2
        },
        {
            name:"Aveeno Shampoo",
            description:"Rich lathering wash & shampoo formula rinses clean & leaves a light, fresh fragrance Gentle and tear-free formula cleanses without drying",
            price:7.00,
            image:"https://picsum.photos/id/100/2500/1656",
            quantity:4
        }
      
    ]


    app.get("/api/mycart", function (req, res) {
        // 2. Add a join here to include the Department who wrote the Products
       
        // if (sessionStorage.getItem('userCartInSession')) {
        //     cart_products= sessionStorage.getItem("userCartInSession");
        //     console.log(JSON.stringify(cart_products));
        // }
        
            
        //declare and send all required variables

          prices=carts.map(function(cart){return cart.price * cart.quantity;});
        
            res.render('partials/cartDetails',
                {
                    layout: false,
                    cart_products:carts,
                    stripePublicKey: stripePublicKey,
                    prices:prices,
                    totalFinalValue:40,
                    subTotalValue:30,
                    shippingValue:6,
                    taxValue:4,                    

                }
            );
    })
       



}