expect = require("./helpers/expect")
utils = require("./helpers/utils")
SignInPage = require("./helpers/page_objects/signin_page")

describe "Signin page", ->
  signinPage = null

  beforeEach ->
    browser.get "/login"

    signinPage = new SignInPage()
    utils.loadFixtures('/api/users/_loadFixtures')

  it "displays a valid page title", ->
    expect(browser.getCurrentUrl()).to.eventually.match /login$/
    expect(browser.getTitle()).to.eventually.eq "Todos App"

  describe "click on 'signin' button without fill data", ->
    beforeEach ->
      signinPage.signInInput.click()
    it "should display a error message", ->
        expect(signinPage.formErrorEmpty.isDisplayed()).to.eventually.true
        expect(signinPage.formErrorEmpty.getText()).to.eventually.eq "Please enter your email and password."

  describe "click on 'signin' button with incorrect data", ->
    it "should display a error message if password is incorrect", ->
        signinPage.signin null, "password"
        expect(signinPage.formError.getText()).to.eventually.eq "This password is not correct."

    it "should display a error message if password is incorrect", ->
        signinPage.signin "anothertest@test.com"
        expect(signinPage.formError.getText()).to.eventually.eq "This email is not registered."

  describe "click on 'signin' button with correct data", ->
    beforeEach ->
      signinPage.signin()
    it "should sign in the user", ->
       expect(browser.getCurrentUrl()).to.eventually.match /$/

