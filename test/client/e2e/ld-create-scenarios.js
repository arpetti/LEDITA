'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Create a new Learning Design', function() {

	it('Displays a modal popup when user clicks Create LD', function() {
		var existingUserName = testUsers.getMarioUserName;
        var existingUserPassword = testUsers.getMarioUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        element('#createLd').click();

        // Verify qcer options are displayed in modal
        expect(repeater('.qcerOptData').count()).toBe(6);
        expect(repeater('.qcerOptData').column('qceropt.name')).toEqual(["A1","A2","B1","B2","C1","C2"]);

        element("#cancelCreateLd").click();

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
	});

});