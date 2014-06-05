module.exports = (grunt) ->
    dist:
        options:
            collapseWhitespace: true
            #collapseBooleanAttributes: true
            #removeCommentsFromCDATA: true
            #removeOptionalTags: true
        files: [
            expand: true
            cwd: '<%= appConfig.app %>/views'
            src: ['*.html', 'partials/**/*.html']
            dest: '<%= appConfig.dist %>/views'
        ]
