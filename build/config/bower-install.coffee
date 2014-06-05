module.exports = (grunt) ->
    app:
        html: '<%= appConfig.app %>/views/index.html'
        ignorePath: '<%= appConfig.app %>/'
        exclude: ['bootstrap-sass']
