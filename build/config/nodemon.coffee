module.exports = (grunt) ->
    debug:
        script: 'server'
        options:
            nodeArgs: ['--debug-brk']
            env:
                PORT: process.env.PORT || 9000
            callback: (nodemon) ->
                nodemon.on 'log', (event) ->
                    console.log(event.colour);
                # opens browser on initial server start
                nodemon.on 'config:update', ->
                    setTimeout ->
                        require('open')('http://localhost:8080/debug?port=5858')
                    , 500
