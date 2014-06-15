"use strict"
path = require("path")
rootPath = path.normalize(__dirname + "/../../..")
module.exports =
  root: rootPath
  port: process.env.PORT or 9000
  dummydata: false
  mongo:
    options:
      db:
        safe: true
