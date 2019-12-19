var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/product", function(req, res) {
    var query = {};
    if (req.query.department_id) {
      query.DepartmentId = req.query.department_id;
    }
    db.Product.findAll({
      where: query,
      include: [db.Department]
    }).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get route for retrieving a single Products
  app.get("/api/product/detail/:id", function(req, res) {
    // 2. Add a join here to include the Department who wrote the Products
    db.Product.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Department]
    }).then(function(dbProducts) {
      res.json(dbProducts);      
    });
  });
  // Products route for saving a new Products
  app.post("/api/product", function(req, res) {
    db.Product.create(req.body).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
  // DELETE route for deleting products
  app.delete("/api/product/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  // PUT route for updating products
  app.put("/api/product", function(req, res) {
    db.Product.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
};
