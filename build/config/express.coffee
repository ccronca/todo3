module.exports = (grunt) ->
    options:
        port: process.env.PORT || 9000
        opts: ['node_modules/coffee-script/bin/coffee']
    dev:
        options:
            script: 'server.coffee'
            debug: true
    prod:
        options:
          script: 'dist/server.js'
          node_env: 'production'
