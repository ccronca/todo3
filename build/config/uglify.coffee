module.exports = (grunt) ->
    dist:
        files:
            '<%= appConfig.dist %>/scripts/scripts.js': [
                '<%= appConfig.dist %>/scripts/scripts.js'
           ]
