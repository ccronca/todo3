module.exports = (grunt) ->
    options:
        browsers: ['last 1 version']
    dist:
        files: [
            expand: true
            cwd: '<%= appConfig.app %>/styles/'
            src: '{,*/}*.css'
            dest: '<%= appConfig.app %>/styles/'
        ]
