var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/cart", function(req, res) {
    var query = {};
    if (req.query.customer_id) {
      query.UserId = req.query.customer_id;
    }
    db.Cart.findAll({
      where: query
    }).then(function(carts) {
      res.json(carts);
    });
  });

  app.get("/api/cart/:id", function(req, res) {
    // 2; Add a join to include all of the Department's Product here
    db.Cart.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbCart) {
      res.json(dbCart);
    });
  });

  app.post("/api/cart", function(req, res) {
    db.Cart.create(req.body).then(function(dbCart) {
      res.json(dbCart);
    });
  });

  app.delete("/api/cart/:id", function(req, res) {
    db.Cart.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCart) {
      res.json(dbCart);
    });
  });
};