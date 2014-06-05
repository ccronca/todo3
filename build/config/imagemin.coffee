module.exports = (grunt) ->
    options:
        cache: false
    dist:
        files: [
            expand: true
            cwd: '<%= appConfig.app %>/images'
            src: '{,*/}*.{png,jpg,jpeg,gif}'
            dest: '<%= appConfig.dist %>/public/images'
        ]
