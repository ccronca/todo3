module.exports = (grunt) ->
    dist:
        files: [
            expand: true
            cwd: '<%= appConfig.app %>/images'
            src: '{,*/}*.svg'
            dest: '<%= appConfig.dist %>/public/images'
        ]
