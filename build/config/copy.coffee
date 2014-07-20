module.exports = (grunt) ->
    dist:
        files: [
            expand: true
            dot: true
            cwd: '<%= appConfig.app %>'
            dest: '<%= appConfig.dist %>/public'
            src: [
                '*.{ico,png,txt}'
                '.htaccess'
                'components/**/*'
                'images/{,*/}*.{webp}'
                'fonts/**/*'
            ]
        ,
            expand: true
            dot: true
            cwd: '<%= appConfig.app %>/views'
            dest: '<%= appConfig.dist %>/views'
            src: '**/*.jade'
        ,
            expand: true
            cwd: '<%= appConfig.tmp %>/images'
            dest: '<%= appConfig.dist %>/public/images'
            src: ['generated/*']
        ,
            expand: true
            dest: '<%= appConfig.dist %>'
            src: [
                'package.json'
                'server.coffee'
                'lib/**/*'
            ]
        ]
        styles:
            expand: true
            cwd: '<%= appConfig.app %>/styles'
            dest: '<%= appConfig.tmp %>/public/styles/'
            src: '{,*/}*.css'
