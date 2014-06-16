module.exports = (grunt) ->
    coffee:
        files: ['<%= appConfig.app %>/scripts/**/*.coffee']
        tasks: 'coffee'
    mochaTest:
        files: ['<%= appConfig.test %>/server/{,*/}*.coffee']
        tasks: ['env:test', 'mochaTest']
    karmaTest:
        files: ['<%= appConfig.test %>/client/unit/{,*/}*.coffee']
        tasks: ['env:test', 'karma']
    protractorTest:
        files: ['<%= appConfig.test %>/client/integration/{,*/}*.coffee']
        tasks: ['env:test', 'protractor']
    compass:
        files: ['<%= appConfig.dev %>/styles/{,*/}*.{scss,sass}']
        tasks: ['compass:server', 'autoprefixer']
    gruntfile:
        files: ['Gruntfile.coffee']
    livereload:
        files: [
            '<%= appConfig.app %>/views/{,*//*}*.html'
            '<%= appConfig.app %>/scripts/{,*//*}*.js'
            '<%= appConfig.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
        options:
            livereload: true
    express:
        files: [
            'server.coffee'
            'lib/**/*.{coffee,json}'
        ]
        tasks: ['express:dev', 'wait']
        options:
            livereload: true,
            nospawn: true  #Without this option specified express won't be reloaded
