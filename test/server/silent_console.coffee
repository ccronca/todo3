###
fs = require("fs")
util = require("util")
log = fs.createWriteStream("var/stdout.log")
console.log = console.info = (t) ->
  out = undefined
  if t and ~t.indexOf("%")
    out = util.format.apply(util, arguments_)
    process.stdout.write out + "\n"
    return
  else
    out = Array::join.call(arguments_, " ")
  out and log.write(out + "\n")
  return
###
