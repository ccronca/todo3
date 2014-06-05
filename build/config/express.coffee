module.exports = (grunt) ->
    options:
        port: process.env.PORT || 9000
    dev:
        options:
            script: 'server.js'
            debug: true
    prod:
        options:
          script: 'dist/server.js'
          node_env: 'production'
