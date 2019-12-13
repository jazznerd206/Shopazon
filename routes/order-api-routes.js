var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/order", function(req, res) {
    var query = {};
    if (req.query.customer_id) {
      query.CustomerId = req.query.customer_id;
    }
    db.Order.findAll({
      where: query
    }).then(function(orders) {
      res.json(orders);
    });
  });

  app.get("/api/order/:id", function(req, res) {
    // 2; Add a join to include all of the Department's Product here
    db.Order.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.post("/api/order", function(req, res) {
    db.Order.create(req.body).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.delete("/api/order/:id", function(req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });
};
