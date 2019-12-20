var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

// Should get all products
describe("GET /api/products", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
});

it("find all products available", function(done) {
    // Add some examples to the db to test with
    db.Products.bulkCreate([
      {
        id: 1,
        name: "coffee",
        itemdescription: "Bold, earthy flavors.",
        price: 12.00,
        image: "none"
      },
      {
        id: 1,
        name: "coffee",
        itemdescription: "Bold, earthy flavors.",
        price: 12.00,
        image: "none"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/products").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            id: 1,
            name: "coffee",
            itemdescription: "Bold, earthy flavors.",
            price: 12.00,
            image: "none"
        });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            id: 1,
            name: "coffee",
            itemdescription: "Bold, earthy flavors.",
            price: 12.00,
            image: "none"
        });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});