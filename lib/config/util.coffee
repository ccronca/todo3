"use strict"
fs = require("fs")
path = require("path")

# recursively walk modules path and callback for each file
walk = (modulesPath, excludeDir, callback) ->
  fs.readdirSync(modulesPath).forEach (file) ->
    newPath = path.join(modulesPath, file)
    stat = fs.statSync(newPath)
    if stat.isFile() and /(.*)\.(js|coffee)$/.test(file)
      callback newPath
    else walk newPath, excludeDir, callback  if stat.isDirectory() and file isnt excludeDir
    return

  return

exports.walk = walk
