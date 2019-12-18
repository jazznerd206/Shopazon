var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/address", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UsertId = req.query.user_id;
    }
    db.address.findAll({
      where: query,
      include: [db.Address]
    }).then(function(dbAddress) {
      res.json(dbAddress);
    });
  });
  app.get("/api/address/:id", function(req, res) {
    // 2; Add a join to include all of the Department's Product here
    db.Address.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAddress) {
      res.json(dbAddress);
    });
  });

  app.post("/api/address", function(req, res) {
    db.Address.create(req.body).then(function(dbAddress) {
      res.json(dbAddress);
    });
  });

  app.delete("/api/address/:id", function(req, res) {
    db.Address.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAddress) {
      res.json(dbAddress);
    });
  });
};

