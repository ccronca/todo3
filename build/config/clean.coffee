module.exports = (grunt) ->
    dist:
        files: [
            dot: true,
            src: [
                '.tmp'
                '<%= appConfig.dist %>/*'
                '!<%= appConfig.dist %>/.git*'
                '!<%= appConfig.dist %>/Procfile'
            ]
        ]
    heroku:
        files: [
            dot: true
            src: [
                'heroku/*'
                '!heroku/.git*'
                '!heroku/Procfile'
            ]
        ]
    server: '.tmp'
