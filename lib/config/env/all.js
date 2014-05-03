'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 9000,
  dummydata: false,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};
