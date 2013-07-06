'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

//TODO: Add pageIds to top level div elements so tests can verify what page we're on
describe('Login Flow', function() {

  // FIXME: Angular-Karma-Scenario bug? Doesn't work for navigating to slash
  // Follow issue at: https://github.com/angular/angular.js/issues/3149
  it('Non logged in user sees login or register page', function() {
    browser().navigateTo('/');
    // expect(browser().location().url()).toBe('/');
  });

  it('Non logged in user can navigate to login page', function() {
    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');
  });

  it('New user can register', function() {
    var userNameToRegister = userNameGenerator.buildUserName;

    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');

    input('firstname').enter('John');
    input('surname').enter('Smith');
    input('username').enter(userNameToRegister);
    input('password').enter('123456');
    input('retypepassword').enter('123456');
    element('#signup').click();

    expect(element('#loggedInUserName').text()).toBe(userNameToRegister);
  });

  it('Invalid path redirects to 404', function() {
    browser().navigateTo('/showAllUsers');
    expect(browser().location().url()).toBe('/404');
  });

}); 