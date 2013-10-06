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

	// Work in progress, needs server-side fix for not showing private LD's rather than client side filter
	xit('Logged in user can create a new Learning Design', function() {
		var existingUserName = testUsers.getMarioUserName;
        var existingUserPassword = testUsers.getMarioUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        element('#createLd').click();
        sleep(1);

        input('ldName').enter('Learning Design E2E Test');
        input('selectedQcers[qceropt.id]').check();
        input('ldScope').enter('Scope E2E Test');
        input('ldTopic').enter('Topic E2E Test');
        input('ldObjective').enter('Objective E2E Test');
        input('ldRequisite').enter('Prerequisite E2E Test');
        input('ldStudentsDescr').enter('Students Description E2E Test');
        
        element("#confirmCreateLD").click();
        sleep(1);

        expect(browser().location().url()).toMatch('/ldedit/');

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
	});

});