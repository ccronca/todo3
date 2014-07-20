module.exports = (grunt) ->
    options:
        browsers: ['last 1 version']
    dist:
        files: [
            expand: true
            cwd: '<%= appConfig.tmp %>/styles/'
            src: '{,*/}*.css'
            dest: '<%= appConfig.tmp %>/styles/'
        ]
