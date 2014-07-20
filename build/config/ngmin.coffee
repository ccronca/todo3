module.exports = (grunt) ->
    dist:
        files: [
            expand: true
            cwd: '<%= appConfig.tmp %>/concat/scripts'
            src: '*.js'
            dest: '<%= appConfig.tmp %>/concat/scripts'
        ]
