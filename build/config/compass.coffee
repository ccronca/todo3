module.exports = (grunt) ->
    options:
        sassDir: '<%= appConfig.dev %>/styles'
        cssDir: '<%= appConfig.app %>/styles'
        generatedImagesDir: '<%= appConfig.app %>/images/generated'
        imagesDir: '<%= appConfig.app %>/images'
        javascriptsDir: '<%= appConfig.app %>/scripts'
        fontsDir: '<%= appConfig.app %>/styles/fonts'
        importPath: '<%= appConfig.app %>/components'
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
