module.exports = (grunt) ->
    server: [ 'compass:server' ]
    test: ['compass']
    debug:
        tasks: [
          'nodemon',
          'node-inspector'
        ]
        options:
            logConcurrentOutput: true
    dist: [
        'compass:dist',
        'imagemin',
        'svgmin',
        'htmlmin'
    ]
