module.exports = (grunt) ->
    options:
        reporter: 'spec'
    include: []
    src: ['test/server/controllers/*.coffee', 'test/server/models/*.coffee']
