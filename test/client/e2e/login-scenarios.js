'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Login Flow', function() {

  it('Non logged in user sees login or register page', function() {
    browser().navigateTo('/');
    // This remains commented until have a fix - https://github.com/angular/angular.js/issues/3149
    // expect(browser().location().url()).toBe('/');
  });

  it('Non logged in user can navigate to login page', function() {
    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');
    expect(element('#navBarAnon', 'anon nav is displayed for anon user').css('display')).toBe('block');
    expect(element('#navBarUser', 'user nav is hidden for anon user').css('display')).toBe('none');
  });

  it('New user can register', function() {
    var userNameToRegister = userNameGenerator.buildUserName;

    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');

    // Register
    input('firstname').enter('John');
    input('surname').enter('Smith');
    input('username').enter(userNameToRegister);
    input('password').enter('123456');
    input('retypepassword').enter('123456');
    element('#signup').click();

    // Verify logged in view
    expect(element('#navBarUser', 'user nav is displayed for logged in user').css('display')).toBe('block');
    expect(element('#navBarAnon', 'anon nav is hidden for logged in user').css('display')).toBe('none');
    expect(element('#loggedInUserName', 'user name is displayed for logged in user').text()).toBe(userNameToRegister);

    // Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();

    // Verify anon view
    expect(element('#navBarAnon', 'anon nav is displayed after user logs out').css('display')).toBe('block');
    expect(element('#navBarUser', 'user nav is hidden after user logs out').css('display')).toBe('none');
  });

  it('Invalid path redirects to 404', function() {
    browser().navigateTo('/showAllUsers');
    expect(browser().location().url()).toBe('/404');
  });

}); 