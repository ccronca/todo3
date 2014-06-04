// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      '../app/bower_components/angular/angular.js',
      '../app/bower_components/angular-mocks/angular-mocks.js',
      '../app/bower_components/angular-resource/angular-resource.js',
      '../app/bower_components/angular-cookies/angular-cookies.js',
      '../app/bower_components/angular-sanitize/angular-sanitize.js',
      '../app/bower_components/angular-route/angular-route.js',
      '../app/bower_components/lodash/dist/lodash.js',

      "../app/bower_components/sinon/lib/sinon.js",
      "../app/bower_components/sinon/lib/sinon/spy.js",
      "../app/bower_components/sinon/lib/sinon/call.js",
      "../app/bower_components/sinon/lib/sinon/stub.js",
      "../app/bower_components/sinon/lib/sinon/mock.js",
      "../app/bower_components/sinon/lib/sinon/assert.js",

      '../app/scripts/*.js',
      '../app/scripts/**/*.js',
      "client/unit/**/*_spec.coffee"
    ],

    preprocessors: {
      "../app/scripts/**/*.js": ["coverage"],
      "client/unit/**/*_spec.coffee": ['coffee']
    },
    reporters: ["dots", "coverage"],
    coverageReporter: {
      type: "text-summary",
      dir: "coverage"
    },
    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    /*    plugins: [
      "karma-coffee-preprocessor",

      "karma-mocha",
      "karma-chai-plugins",
      "karma-spec-reporter",
      "karma-coverage",

      "karma-phantomjs-launcher"
    ]*/
  });
};