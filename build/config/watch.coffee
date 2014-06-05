module.exports = (grunt) ->
    js:
        files: ['<%= appConfig.app %>/scripts/{,*/}*.js']
        tasks: ['newer:jshint:all']
        options:
            livereload: true
    coffee:
        files: ['<%= appConfig.app %>/scripts/**/*.coffee']
        tasks: 'coffee'
    mochaTest:
        files: ['test/server/{,*/}*.js']
        tasks: ['env:test', 'mochaTest']
    jsTest:
        files: ['test/client/spec/{,*/}*.js']
        tasks: ['newer:jshint:test', 'karma']
    compass:
        files: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}']
        tasks: ['compass:server', 'autoprefixer']
    gruntfile:
        files: ['Gruntfile.js']
    livereload:
        files: [
            '<%= appConfig.app %>/views/{,*//*}*.{html,jade}'
            '{.tmp,<%= appConfig.app %>}/styles/{,*//*}*.css'
            '{.tmp,<%= appConfig.app %>}/scripts/{,*//*}*.js'
            '<%= appConfig.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
        options:
            livereload: true
    express:
        files: [
            'server.js'
            'lib/**/*.{js,json}'
        ]
        tasks: ['newer:jshint:server', 'express:dev', 'wait']
        options:
            livereload: true,
            nospawn: true  #Without this option specified express won't be reloaded
