module.exports = (grunt) ->
    options:
        sassDir: '<%= appConfig.app %>/styles'
        cssDir: '.tmp/styles'
        generatedImagesDir: '.tmp/images/generated'
        imagesDir: '<%= appConfig.app %>/images'
        javascriptsDir: '<%= appConfig.app %>/scripts'
        fontsDir: '<%= appConfig.app %>/styles/fonts'
        importPath: '<%= appConfig.app %>/bower_components'
        httpImagesPath: '/images'
        httpGeneratedImagesPath: '/images/generated'
        httpFontsPath: '/styles/fonts'
        relativeAssets: false
        assetCacheBuster: false
        raw: 'Sass::Script::Number.precision = 10\n'
    dist:
        options:
            generatedImagesDir: '<%= appConfig.dist %>/public/images/generated'
    server:
        options:
            debugInfo: true
