module.exports = (grunt) ->
    compile:
        files: [
            expand: true
            cwd: "<%= appConfig.app %>/scripts"
            src: "**/*.coffee"
            dest: "<%= appConfig.dev %>/scripts"
            ext: ".js"
        ]
