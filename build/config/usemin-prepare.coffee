module.exports = (grunt) ->
    html: ['<%= appConfig.app %>/views/index.html', '<%= appConfig.app %>/views/index.jade']
    options:
        dest: '<%= appConfig.dist %>/public'
