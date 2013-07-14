'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Learning Design', function() {

    // TODO: create sub section for REST
  it('Non logged in user not allowed to GET learning designs', function() {
    browser().navigateTo('/learningdesigns');
    expect(element('pre').text()).toBe('Unauthorized');
  });

  it('Logged in user is allowed to GET learning designs', function() {
    var existingUserName = testUsers.getUserName;
    var existingUserPassword = testUsers.getUserPassword;

    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');
    input('username').enter(existingUserName);
    input('password').enter(existingUserPassword);
    element('#loginButton').click();

    // Verify GET results
    browser().navigateTo('/learningdesigns');
    expect(element('pre').text()).toMatch('LD Demo 1');

    // Logout (user is already logged in, go to a page with nav bar from which user can log out)
    browser().navigateTo('/login');
    element('#userActionsMenu').click();
    element('#logoutLink').click();

  });

}); 