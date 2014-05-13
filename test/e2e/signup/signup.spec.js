'use strict';

describe('E2E: sign up page', function() {
  var ptor, page, email;


var SignUpPage = function() {
  var getElementByModel = function (ele) {
  	return element(by.model(ele));
  };

  this.nameInput = getElementByModel('user.name');
  this.emailInput = getElementByModel('user.email');
  this.passwordInput = getElementByModel('user.password');
  this.submit = element(by.id('signupsubmit'));

  this.get = function() {
    browser.get('/signup');
  };

  this.setName = function(name) {
    this.nameInput.sendKeys(name);
  };

  this.setEmail = function(email) {
    this.emailInput.sendKeys(email);
  };

  this.setPassword = function(password) {
    this.passwordInput.sendKeys(password);
  };
};

var expectExits = function(ele) {
	expect(ele.isPresent()).toBe(true);
};

  beforeEach(function() {
    ptor = protractor.getInstance();
    page = page || new SignUpPage();
    page.get();
    email = email || 'test@' + Math.random().toString(36).substring(7) + '.com';
  });

  it('should exists the input for name', function() {
    expectExits(page.nameInput);
  });

  it('should exists the input for email', function() {
    expectExits(page.emailInput);
    expect(page.emailInput.getAttribute('type')).toBe('email');
  });

  it('should exists the input for password', function() {
    expectExits(page.passwordInput)
    expect(page.passwordInput.getAttribute('type')).toBe('password');
  });

  it('should exists the submit', function() {
    expectExits(page.submit);
  });

  it('should not exists logout link', function () {
  	expect(element(by.id('logout')).isDisplayed()).toBe(false);
  });

  it('should send signup form', function () {
  	email 
  	page.setName('Test');
  	page.setEmail(email);
  	page.setPassword('test');

  	page.submit.click().then(function() {
  		expect(element(by.id('logout')).isDisplayed()).toBe(true);
  	});

  });

   it('should show error on email address is already in use.', function () {

  	page.setName('Test');
  	page.setEmail(email);
  	page.setPassword('test');

  	page.submit.click().then(function() {
  		expect(element(by.id('logout')).isDisplayed()).toBe(false);
  	});

  });
});