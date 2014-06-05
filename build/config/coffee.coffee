module.exports = (grunt) ->
    compile:
        files: [
            expand: true
            cwd: ''
            src: ['<%= appConfig.app %>/scripts/**/*.coffee']
            dest: ''
            ext: '.js'
        ]
