PageObject = require("./page_object")

class LoginPage extends PageObject

    @has "userEmail", ->
        browser.findElement @By.input "user.email"

    @has "userPassword", ->
        browser.findElement @By.input "user.password"

    @has "signInInput", ->
        browser.findElement @By.css "button#signin-btn"

    @has "errors", ->
        browser.findElement @By.css "p#errors-form"

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

