(function() {
  var PageObject;

  PageObject = (function() {
    function PageObject() {}

    PageObject.prototype.By = protractor.By;

    PageObject.prototype.byLabel = function(label, tag) {
      if (tag == null) {
        tag = "a";
      }
      return this.By.xpath(".//" + tag + "[contains(text(), '" + label + "')]");
    };

    PageObject.prototype.waitForAnimations = function() {
      return browser.wait((function(_this) {
        return function() {
          var animated;
          animated = browser.findElements(_this.By.css(".ng-animate"));
          return animated.then(function(animated) {
            return animated.length === 0;
          });
        };
      })(this));
    };

    PageObject.has = function(name, getter) {
      return Object.defineProperty(this.prototype, name, {
        get: getter
      });
    };

    return PageObject;

  })();

  module.exports = PageObject;

}).call(this);
