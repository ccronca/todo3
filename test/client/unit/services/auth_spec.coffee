describe "Module `todoApp Auth factory`", ->

  beforeEach module "todoApp"

  describe "Factory `Auth`", ->
    $rootScope = null
    $httpBackend = null
    Auth = null
    user =
      email: "test@test.com"
      password: "bar"

    loginUser = (callback) ->
      $httpBackend.whenPOST("/api/session").respond(user)
      promise = Auth.login user, ->
        callback()
      $httpBackend.flush()


    beforeEach inject (_$rootScope_, _$httpBackend_, _Auth_) ->
      $rootScope = _$rootScope_
      $httpBackend = _$httpBackend_
      Auth = _Auth_

    it "is defined", ->
      expect(Auth).to.not.be.undefined

    describe ".login()", ->
      it "is defined", ->
        expect(Auth.login).to.not.be.undefined

      it "populate current user", ->
        loginUser ->
          expect($rootScope.currentUser.email).to.not.be.undefined
          expect($rootScope.currentUser.email).to.equal user.email

    describe ".logout()", ->
      it "is defined", ->
        expect(Auth.logout).to.not.be.undefined

      it "delete current user", ->

        $httpBackend.whenDELETE("/api/session").respond({})
        loginUser ->
          promise = Auth.logout ->
            expect($rootScope.currentUser).to.be.null

    describe ".createUser()", ->
      it "is defined", ->
        expect(Auth.createUser).to.not.be.undefined
      it "populate current user", ->
        $httpBackend.whenPOST("/api/users").respond(user)
        promise = Auth.createUser user, ->
          expect($rootScope.currentUser.email).to.not.be.undefined
          expect($rootScope.currentUser.email).to.equal user.email
        $httpBackend.flush()

    describe ".currentUser()", ->
      it "is defined", ->
        expect(Auth.currentUser).to.not.be.undefined
      it "get current user", ->
        $httpBackend.whenGET("/api/users/me").respond(user)
        Auth.currentUser().$promise.then (data) ->
          expect(data).to.not.be.undefined
          expect(data.email).to.equal user.email
        $httpBackend.flush()

    describe ".isLoggedIn()", ->
      it "is defined", ->
        expect(Auth.isLoggedIn).to.not.be.undefined

      context "when no user is logged", ->
        it "return false", ->
          $rootScope.currentUser = null
          expect(Auth.isLoggedIn()).to.be.false
      context "when user is logged", ->
        it "return true", ->
          $rootScope.currentUser = user
          expect(Auth.isLoggedIn()).to.be.true

    describe ".changePassword()", ->
      it "is defined", ->
        expect(Auth.changePassword).to.not.be.undefined

      it "return the user data", ->
        $httpBackend.whenPUT("/api/users").respond(user)
        Auth.changePassword(user.password, 'newpassword').then (data) ->
          expect(data).to.not.be.undefined
        $httpBackend.flush()
