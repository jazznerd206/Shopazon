let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let db = require("../models");
let expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe("GET /api/product", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: "First Example", description: "First Description" },
      { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/product").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);
        expect(responseBody).to.be.an(array);


        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

