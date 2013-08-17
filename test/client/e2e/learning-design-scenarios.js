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
    expect(repeater('#ldlist .ld-item').count()).toBeGreaterThan(5);

    // Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();

  });

  it('Clicking on Learning Design displays detail view',function() {
    var existingUserName = testUsers.getUserName;
    var existingUserPassword = testUsers.getUserPassword;

    browser().navigateTo('/login');
    input('username').enter(existingUserName);
    input('password').enter(existingUserPassword);
    element('#loginButton').click();
    sleep(2);

    // Click on first result 
    element('#ldlist .ld-item:nth-child(1) .ld-center a').click();
    sleep(2);

    // Verify detail view
    // This is brittle because order by last edit date where all dates are same is unpredictable
    expect(browser().location().url()).toBe('/ld/28');
    expect(binding('learningDesign.ld_name')).toBe('Learning Design Title Demo 28');
    expect(binding('learningDesign.ld_students_profile')).toBe('20 studenti adolescenti di livello B1');

    // Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();
  });

}); 