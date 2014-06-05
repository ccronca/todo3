module.exports = (grunt) ->
    dist:
        files:
            src: [
                '<%= appConfig.dist %>/public/scripts/{,*/}*.js'
                '<%= appConfig.dist %>/public/styles/{,*/}*.css'
                '<%= appConfig.dist %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                '<%= appConfig.dist %>/public/styles/fonts/*'
            ]
