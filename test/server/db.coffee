mongoose = require("mongoose")
config = require(process.cwd() + "/lib/config/config")
db = mongoose.connect(config.mongo.uri, config.mongo.options)
connection = mongoose.connection
before (done) ->
  connection.on "open", ->
    connection.db.dropDatabase done
    return

  return

after (done) ->
  connection.close done
  return

