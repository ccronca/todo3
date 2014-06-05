module.exports = (grunt) ->
    html: ['<%= appConfig.dist %>/views/{,*/}*.html', '<%= appConfig.dist %>/views/{,*/}*.jade' ]
    css: ['<%= appConfig.dist %>/public/styles/{,*/}*.css']
    options:
        assetsDirs: ['<%= appConfig.dist %>/public']
