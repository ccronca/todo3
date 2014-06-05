module.exports = (grunt) ->
    options:
        reporter: 'spec'
    include: []
    src: ['test/server/controllers/*.js', 'test/server/models/*.js']
