module.exports = (grunt) ->
    coffee:
        files: ['<%= appConfig.app %>/scripts/**/*.coffee']
        tasks: 'coffee'
        options:
            livereload: true
    mochaTest:
        files: ['test/server/{,*/}*.coffee']
        tasks: ['env:test', 'mochaTest']
    jsTest:
        files: ['test/client/spec/{,*/}*.coffee']
        tasks: ['newer:jshint:test', 'karma']
    compass:
        files: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}']
        tasks: ['compass:server', 'autoprefixer']
    gruntfile:
        files: ['Gruntfile.coffee']
    livereload:
        files: [
            '<%= appConfig.app %>/views/{,*//*}*.{html,jade}'
            '{.tmp,<%= appConfig.app %>}/styles/{,*//*}*.css'
            '{.tmp,<%= appConfig.app %>}/scripts/{,*//*}*.coffee'
            '<%= appConfig.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
        options:
            livereload: true
    express:
        files: [
            'server'
            'lib/**/*.{js,json}'
        ]
        tasks: ['express:dev', 'wait']
        options:
            livereload: true,
            nospawn: true  #Without this option specified express won't be reloaded
