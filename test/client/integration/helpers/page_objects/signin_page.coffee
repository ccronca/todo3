PageObject = require("./page_object")

class LoginPage extends PageObject

    @has "userEmail", ->
        browser.findElement @By.input "user.email"

    @has "userPassword", ->
        browser.findElement @By.input "user.password"

    @has "signInInput", ->
        browser.findElement @By.css "button#signinBtn"

    @has "formError", ->
        browser.findElement @By.css "p#formError"

    @has "formErrorEmail", ->
        browser.findElement @By.css "p#formErrorEmail"

    @has "formErrorEmpty", ->
        browser.findElement @By.css "p#formErrorEmpty"

    setEmail: (value) ->
        @userEmail.clear()
        @userEmail.sendKeys value
    setPassword: (value) ->
        @userPassword.clear()
        @userPassword.sendKeys value

    signin: (email="test@test.com", password="test") ->
        @setEmail email
        @setPassword password
        @signInInput.click()

module.exports = LoginPage

