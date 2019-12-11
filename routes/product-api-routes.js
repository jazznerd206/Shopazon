var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/product", function(req, res) {
    db.Product.findAll({}).then(function(products) {
      res.json(products);
    });
  });
};
