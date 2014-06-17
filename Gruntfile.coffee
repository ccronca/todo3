module.exports = (grunt) ->
    appConfig =
        app: "app"
        test: "test"
        dist: "dist"
        dev: "dev"

    loadModule = (name) ->
        require("./build/config/#{name}")(grunt, appConfig)

    require('load-grunt-tasks')(grunt)

    require('time-grunt')(grunt);

    grunt.initConfig
        appConfig: appConfig
        express: loadModule "express"
        open: loadModule "open"
        watch: loadModule "watch"
        jshint: loadModule "jshint"
        clean: loadModule "clean"
        autoprefixer: loadModule "autoprefixer"
        nodemon: loadModule "nodemon"
        'bower-install': loadModule "bower-install"
        compass: loadModule "compass"
        rev: loadModule "rev"
        useminPrepare: loadModule "usemin-prepare"
        usemin: loadModule "usemin"
        imagemin: loadModule "imagemin"
        svgmin: loadModule "svgmin"
        htmlmin: loadModule "htmlmin"
        ngmin: loadModule "ngmin"
        cdnify: loadModule "cdnify"
        copy: loadModule "copy"
        concurrent: loadModule "concurrent"
        karma: loadModule "karma"
        protractor: loadModule "protractor"
        mochaTest: loadModule "mocha-test"
        coffee: loadModule "coffee"
        env: loadModule "env"

    grunt.registerTask "wait", ->
        grunt.log.ok('Waiting for server reload...')

        done = @async()

        setTimeout ->
            grunt.log.writeln('Done waiting!');
            done();
        , 500

    grunt.registerTask "express-keepalive", "Keep grunt running", -> @async()

    grunt.registerTask "serve", (target) ->
        grunt.task.run ['build', 'express:prod', 'open', 'express-keepalive'] if target == 'dist'
        if target == 'debug'
            grunt.task.run [
                'bower-install'
                'concurrent:server'
                'autoprefixer'
                'concurrent:debug'
            ]
        else
            grunt.task.run [
                'bower-install'
                'concurrent:server'
                'autoprefixer'
                'express:dev'
                'open'
                'watch'
            ]

    grunt.registerTask "test" , (target) ->
        if target == 'server'
            grunt.task.run ['env:test','mochaTest']
        else if target == 'client'
            grunt.task.run [
                'concurrent:test'
                'autoprefixer'
                'karma'
                'protractor'
            ]
        else
            grunt.task.run [
                'test:server'
                'test:client'
            ]

    grunt.registerTask 'build', [
        'clean:dist'
        'bower-install'
        'useminPrepare'
        'concurrent:dist'
        'autoprefixer'
        'concat'
        'ngmin'
        'copy:dist'
        'cdnify'
        'cssmin'
        'uglify'
        'rev'
        'usemin'
    ]

    grunt.registerTask 'heroku', ->
        grunt.log.warn 'The `heroku` task has been deprecated. Use `grunt build` to build for deployment.'
        grunt.task.run ['build']

    grunt.registerTask 'default', [
        'newer:jshint'
        'test'
        'build'
    ]
