(function() {
  var fs, request;

  request = require("request");

  fs = require("fs");

  module.exports = {
    loadFixtures: function(url) {
      var baseUrl, fixturesLoaded;
      if (url == null) {
        url = "/api/_loadFixtures";
      }
      baseUrl = browser.baseUrl;
      fixturesLoaded = false;
      request.get(("" + baseUrl) + url, function() {
        return fixturesLoaded = true;
      });
      return browser.wait(function() {
        return fixturesLoaded;
      });
    },
    takeScreenshot: function(fileName) {
      if (fileName == null) {
        fileName = "screenshot-" + (new Date());
      }
      return browser.takeScreenshot().then(function(screenshot) {
        return fs.writeFileSync("" + fileName + ".png", screenshot, "base64");
      });
    }
  };

}).call(this);
