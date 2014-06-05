'use strict';

module.exports = (grunt) ->
    appConfig =
        app: "app"
        test: "test"
        dist: "dist"
        dev: "dev"

    loadMoule = (name) ->
        require("./build/config/#{name}")(grunt, appConfig)

    require('load-grunt-tasks')(grunt)

    require('time-grunt')(grunt);

    grunt.initConfig
        appConfig: appConfig
        express: loadMoule "express"
        open: loadMoule "open"
        watch: loadMoule "watch"
        jshint: loadMoule "jshint"
        clean: loadMoule "clean"
        autoprefixer: loadMoule "autoprefixer"
        nodemon: loadMoule "nodemon"
        'bower-install': loadMoule "bower-install"
        compass: loadMoule "compass"
        rev: loadMoule "rev"
        useminPrepare: loadMoule "usemin-prepare"
        usemin: loadMoule "usemin"
        imagemin: loadMoule "imagemin"
        svgmin: loadMoule "svgmin"
        htmlmin: loadMoule "htmlmin"
        cdnify: loadMoule "cdnify"
        copy: loadMoule "copy"
        concurrent: loadMoule "concurrent"
        karma: loadMoule "karma"
        protractor: loadMoule "protractor"
        mochaTest: loadMoule "mocha-test"
        coffee: loadMoule "coffee"
        env: loadMoule "env"

    grunt.registerTask "wait", =>
        grunt.log.ok('Waiting for server reload...')

        done = @async()

        setTimeout ->
            grunt.log.writeln('Done waiting!');
            done();
        , 500

    grunt.registerTask "express-keepalive", "Keep grunt running", => @async()

    grunt.registerTask "serve", (target) ->
        grunt.task.run ['build', 'express:prod', 'open', 'express-keepalive'] if target == 'dist'
        if target == 'debug'
            grunt.task.run [
                'clean:server'
                'bower-install'
                'concurrent:server'
                'autoprefixer'
                'concurrent:debug'
            ]

        grunt.task.run [
            'clean:server'
            'bower-install'
            'concurrent:server'
            'autoprefixer'
            'express:dev'
            'open'
            'watch'
        ]

    grunt.registerTask "test" , (target) ->
        grunt.task.run ['env:test','mochaTest'] if target == 'server'
        if target == 'client'
            grunt.task.run [
                'clean:server'
                'concurrent:test'
                'autoprefixer'
                'karma'
                'protractor'
            ]

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
