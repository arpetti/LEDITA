'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Create a new Learning Design', function() {

	var existingUserName = testUsers.getMarioUserName;
    var existingUserPassword = testUsers.getMarioUserPassword;

	it('Displays a modal popup when user clicks Create LD', function() {
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

	describe('Server side validation', function() {

		it('Enforces at least one qcer must be selected', function() {
			browser().navigateTo('/login');
	        input('username').enter(existingUserName);
	        input('password').enter(existingUserPassword);
	        element('#loginButton').click();
	        sleep(2);

	        // open LD Create modal
	        element('#createLd').click();
	        sleep(1);

	        // fill out the form, but don't select qcer
	        input('ldName').enter('some name');
	        input('ldScope').enter('some scope');
	        input('ldTopic').enter('some topic');
	        input('ldObjective').enter('some objective');
	        input('ldRequisite').enter('some prereq');
	        input('ldStudentsDescr').enter('some description');
	        
	        element("#confirmCreateLD").click();
	        sleep(1);

	        expect(element('#ldCreateErrors').css('display')).toBe("block");
		    expect(element('#ldCreateErrors').text()).toMatch('At least one Qcer must be selected');

		    element("#cancelCreateLd").click();

	        // Logout
	        element('#userActionsMenu').click();
	        element('#logoutLink').click();
		});

	});

	describe('Client side Validation', function() {

		var verify = function(field, invalidInput, validInput, fieldErrorId, expectedErrorMessage) {
			input(field).enter(invalidInput);
		    sleep(1);
		    expect(element('#confirmCreateLD').attr('disabled')).toBe("disabled");
		    expect(element(fieldErrorId).css('display')).toBe("inline");
		    expect(element(fieldErrorId).text()).toMatch(expectedErrorMessage);
		    input(field).enter(validInput);
		    sleep(1);
		    expect(element(fieldErrorId).css('display')).toBe("none");
		}

		it('Invalid input is not allowed', function() {
			browser().navigateTo('/login');
	        input('username').enter(existingUserName);
	        input('password').enter(existingUserPassword);
	        element('#loginButton').click();
	        sleep(2);

	        // open LD Create modal
	        element('#createLd').click();
	        sleep(1);

	        verify('ldName', '<script>Bad not allowed</script>', 'Good ***', '#ldNamePatternError', 'The design name cannot contain this symbol.');
	        verify('ldScope', '<script>Bad not allowed</script>', 'Good ***', '#ldScopePatternError', 'The design scope cannot contain this symbol.');

	        element("#cancelCreateLd").click();

	        // Logout
	        element('#userActionsMenu').click();
	        element('#logoutLink').click();
		});

	});

});