var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/department", function(req, res) {
    db.Department.findAll({}).then(function(departments) {
      res.json(departments);
    });
  });

  app.get("/api/department/:id", function(req, res) {
    // 2; Add a join to include all of the Department's Product here
    db.Department.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });

  app.post("/api/department", function(req, res) {
    db.Department.create(req.body).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });

  app.delete("/api/department/:id", function(req, res) {
    db.Department.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });
};
