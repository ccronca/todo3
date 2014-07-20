module.exports = (grunt) ->
    compile:
        files: [
            expand: true
            cwd: "<%= appConfig.app %>/scripts"
            src: "**/*.coffee"
            dest: "<%= appConfig.tmp %>/scripts"
            ext: ".js"
        ]
