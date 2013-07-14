'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Learning Design', function() {

  it('Logged in user is can see all learning designs', function() {
    var existingUserName = testUsers.getUserName;
    var existingUserPassword = testUsers.getUserPassword;

    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');
    input('username').enter(existingUserName);
    input('password').enter(existingUserPassword);
    element('#loginButton').click();

    // TODO Verify results

    // Logout
    browser().navigateTo('/login');
    element('#userActionsMenu').click();
    element('#logoutLink').click();

  });

}); 