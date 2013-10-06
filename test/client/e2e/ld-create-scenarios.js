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
        var newLdScope = 'Scope E2E Test';
        var newTopic = 'Topic E2E Test';
        var newObjective = 'Objective E2E Test';
        var newPrereq = 'Prerequisite E2E Test';
        var newLdStudentsDescription = 'Students Description E2E Test';

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
        input('selectedQcers[qceropt.id]').check();  // this checks them all
        input('ldScope').enter(newLdScope);
        input('ldTopic').enter(newTopic);
        input('ldObjective').enter(newObjective);
        input('ldRequisite').enter(newPrereq);
        input('ldStudentsDescr').enter(newLdStudentsDescription);
        
        element("#confirmCreateLD").click();
        sleep(1);

        // should be on edit page
        expect(browser().location().url()).toMatch('/ldedit/');

        // verify LD data entered in form matches whats displayed on edit page
        expect(input('learningDesign.ld_name').val()).toBe(newLdName);
        expect(input('learningDesign.ld_scope').val()).toBe(newLdScope);

        // TODO: Verify qcers (need to figure out data binding for checkboxes)

        // Verify subjects (a.k.a. topics)
        expect(repeater('.subjects li').count()).toBe(1);
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual([newTopic]);

        // Verify objectives
        expect(repeater('.objectives li').count()).toBe(1);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual([newObjective]);

        // Verify prerequisites
        expect(repeater('.prerequisites li').count()).toBe(1);
        expect(repeater('.prerequisites li').column('prereq.prereq_name')).toEqual([newPrereq]);

        // Verify students description
        expect(input('learningDesign.ld_students_profile').val()).toBe(newLdStudentsDescription);

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
	});

});