module.exports = (grunt) ->
    dist:
        files:
           '<%= appConfig.dist %>/styles/main.css': [
                '<%= appConfig.app %>/styles/{,*/}*.css'
           ]

