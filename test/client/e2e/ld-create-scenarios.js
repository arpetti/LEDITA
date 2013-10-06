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

	it('Logged in user can create a new Learning Design', function() {
		var existingUserName = testUsers.getMarioUserName;
        var existingUserPassword = testUsers.getMarioUserPassword;
        var newLdName = 'Learning Design E2E Test';

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        // open LD Create modal
        element('#createLd').click();
        sleep(1);

        // fill out the form
        input('ldName').enter(newLdName);
        input('selectedQcers[qceropt.id]').check();
        input('ldScope').enter('Scope E2E Test');
        input('ldTopic').enter('Topic E2E Test');
        input('ldObjective').enter('Objective E2E Test');
        input('ldRequisite').enter('Prerequisite E2E Test');
        input('ldStudentsDescr').enter('Students Description E2E Test');
        
        element("#confirmCreateLD").click();
        sleep(1);

        // should be on edit page
        expect(browser().location().url()).toMatch('/ldedit/');

        // verify LD data entered in form matches whats displayed on edit page
        expect(input('learningDesign.ld_name').val()).toBe(newLdName);

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
	});

});