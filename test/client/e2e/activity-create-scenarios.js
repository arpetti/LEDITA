'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

// #34 wip...
describe('Activity Create Scenarios', function() {

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	it('Creates an Activity', function() {

		// Login Sara
		var existingUserName = testUsers.getUserName;
    var existingUserPassword = testUsers.getUserPassword;
    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');
    input('username').enter(existingUserName);
    input('password').enter(existingUserPassword);
    element('#loginButton').click();

    // Select an LD 
    element('#ldlist .ld-item:nth-child(17) a .ld-center').click();
    sleep(1);
    expect(browser().location().url()).toBe('/ld/23');
    
    // Edit this LD
    element('#editLdLink').click();
    sleep(0.5);
    expect(browser().location().url()).toBe('/ldedit/23');

    // Add Activity
    element('#createActivity').click();
    sleep(0.3);
    input('actName').enter('Saras new activity created in e2e test');

    // Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();

	});

});