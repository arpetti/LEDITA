'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Learning Design', function() {

  it('Logged in user can see all learning designs', function() {
    var existingUserName = testUsers.getUserName;
    var existingUserPassword = testUsers.getUserPassword;

    browser().navigateTo('/login');
    input('username').enter(existingUserName);
    input('password').enter(existingUserPassword);
    element('#loginButton').click();
    sleep(2);

    // Verify results
    expect(repeater('.ld-item').count()).toBeGreaterThan(8);

    // Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();

  });

}); 