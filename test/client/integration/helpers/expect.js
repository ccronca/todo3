(function() {
  var chai, chaiAsPromised;

  chai = require("chai");

  chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);

  module.exports = chai.expect;

}).call(this);
