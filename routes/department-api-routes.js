var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/department", function(req, res) {
    db.Department.findAll({}).then(function(departments) {
      res.json(departments);
    });
  });
};
