module.exports = (grunt) ->
    dist:
        files: [
            expand: true
            cwd: 'dev/scripts'
            src: '*.js'
            dest: 'dev/scripts'
        ]
