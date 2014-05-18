todosHttpBackendMock = ->
    angular.module 'todosHttpBackendMock', ['ngMockE2E', 'todoApp']
    .run ($httpBackend) ->
        authenticated = true
        todos =
            [
                {
                    "_id":"53785cf03b72d56031614c65"
                    "updatedAt":"2014-05-18T07:10:40.311Z"
                    "createdAt":"2014-05-18T07:10:40.311Z"
                    "title":"Dummy Title 1"
                    "completed":true
                },
                {
                    "_id":"53785cf03b72d56031614c64"
                    "updatedAt":"2014-05-18T07:10:40.309Z"
                    "createdAt":"2014-05-18T07:10:40.308Z"
                    "title":"Dummy Title 2"
                    "completed":false
                },
                # {
                #     "_id":"53785cf03b72d56031614c63"
                #     "updatedAt":"2014-05-18T07:10:40.301Z"
                #     "createdAt":"2014-05-18T07:10:40.300Z"
                #     "title":"Dummy Title 3"
                #     "completed":false
                # }
            ]

        $httpBackend.whenGET '/api/todos'
        .respond (method, url, data, headers) ->
            if authenticated then [200, todos, {}] else [401, {}, {}]

module.exports =
    todosHttpBackendMock: todosHttpBackendMock
