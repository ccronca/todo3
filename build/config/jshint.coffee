module.exports = (grunt) ->
    options:
        jshintrc: '.jshintrc'
        reporter: require 'jshint-stylish'
    server:
        options:
            jshintrc: 'lib/.jshintrc'
        src: ['lib/{,*/}*.js']
    all: [
        '<%= appConfig.app %>/scripts/{,*/}*.js', '!<%= appConfig.app %>/scripts/{,*/}*_*.js'
      ],
    test:
        options:
            jshintrc: 'test/client/.jshintrc'
        src: ['test/client/spec/{,*/}*.js']
