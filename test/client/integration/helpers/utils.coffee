request = require("request")
fs = require("fs")

module.exports =

  # Load fixtures and wait until the request is completed
  loadFixtures: (url = "/api/_loadFixtures")->
    baseUrl = browser.baseUrl

    fixturesLoaded = false
    request.get "#{baseUrl}" + url, -> fixturesLoaded = true
    browser.wait -> fixturesLoaded

  takeScreenshot: (fileName = "screenshot-#{new Date()}") ->
    browser.takeScreenshot().then (screenshot) ->
      fs.writeFileSync("#{fileName}.png", screenshot, "base64")
