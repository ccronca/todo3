module.exports = (grunt) ->
    dist:
        files:
           '<%= appConfig.dist %>/styles/main.css': [
                '.tmp/styles/{,*/}*.css',
                '<%= appConfig.app %>/styles/{,*/}*.css'
           ]

