var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/orderProduct", function(req, res) {
    var query = {};
    if (req.query.order_id) {
      query.OrderId = req.query.order_id;
    }
    db.OrderProduct.findAll({
      where: query,
      include: [db.Order]
    }).then(function(dbOrderProduct) {
      res.json(dbOrderProduct);
    });
  });

  // Get route for retrieving a single Products
  app.get("/api/orderProduct/:id", function(req, res) {
    // 2. Add a join here to include the Department who wrote the Products
    db.OrderProduct.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrderProduct) {
      console.log(dbOrderProduct);
      res.json(dbOrderProduct);
    });
  });
  // Products route for saving a new Products
  app.post("/api/orderProduct", function(req, res) {
    db.OrderProduct.create(req.body).then(function(dbOrderProduct) {
      res.json(dbOrderProduct);
    });
  });
  // DELETE route for deleting products
  app.delete("/api/orderProduct/:id", function(req, res) {
    db.OrderProduct.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrderProduct) {
      res.json(dbOrderProduct);
    });
  });

  // PUT route for updating products
  app.put("/api/orderProduct", function(req, res) {
    db.OrderProduct.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbOrderProduct) {
      res.json(dbOrderProduct);
    });
  });
};
