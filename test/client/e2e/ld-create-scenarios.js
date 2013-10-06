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

        expect(browser().location().url()).toMatch('/ldedit/');
        expect(input('learningDesign.ld_name').val()).toBe(newLdName);
        expect(input('learningDesign.ld_scope').val()).toBe(newLdScope);
        expect(repeater('.subjects li').count()).toBe(1);
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual([newTopic]);
        expect(repeater('.objectives li').count()).toBe(1);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual([newObjective]);
        expect(repeater('.prerequisites li').count()).toBe(1);
        expect(repeater('.prerequisites li').column('prereq.prereq_name')).toEqual([newPrereq]);
        expect(input('learningDesign.ld_students_profile').val()).toBe(newLdStudentsDescription);
        
        // TODO: Verify qcers (need to figure out data binding for checkboxes)

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
	});

	it('Logged in user can create a new Learning Design with no Prerequisites', function() {
        var newLdName = 'Learning Design E2E Test no prereq';
        var newLdScope = 'Scope E2E Test no prereq';
        var newTopic = 'Topic E2E Test no prereq';
        var newObjective = 'Objective E2E Test no prereq';
        var newLdStudentsDescription = 'Students Description E2E Test no prereq';

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
        input('ldStudentsDescr').enter(newLdStudentsDescription);
        
        element("#confirmCreateLD").click();
        sleep(1);

        expect(browser().location().url()).toMatch('/ldedit/');
        expect(input('learningDesign.ld_name').val()).toBe(newLdName);
        expect(input('learningDesign.ld_scope').val()).toBe(newLdScope);
        expect(repeater('.subjects li').count()).toBe(1);
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual([newTopic]);
        expect(repeater('.objectives li').count()).toBe(1);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual([newObjective]);
        expect(repeater('.prerequisites li').count()).toBe(0);
        expect(input('learningDesign.ld_students_profile').val()).toBe(newLdStudentsDescription);
        
        // TODO: Verify qcers (need to figure out data binding for checkboxes)

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
		    sleep(0.3);
		    expect(element('#confirmCreateLD').attr('disabled')).toBe("disabled");
		    expect(element(fieldErrorId).css('display')).toBe("inline");
		    expect(element(fieldErrorId).text()).toMatch(expectedErrorMessage);
		    input(field).enter(validInput);
		    sleep(0.3);
		    expect(element(fieldErrorId).css('display')).toBe("none");
		};

		it('Invalid input is not allowed', function() {
			var badPatternText = '<script>Bad not allowed</script>';
			var goodPatternText = 'Good *** 0123';
			var ldNameTooLong = testUsers.buildLongLdName;
			var ldNameMaxAllowed = testUsers.buildMaxLdName;
			var topicTooLong = testUsers.buildLongTopic;
			var topicMaxAllowed = testUsers.buildMaxTopic;
			var studentsDescrTooLong = testUsers.buildLongStudentsDescr;
			var studentsDescrMaxAllowed = testUsers.buildMaxStudentsDescr;

			browser().navigateTo('/login');
	        input('username').enter(existingUserName);
	        input('password').enter(existingUserPassword);
	        element('#loginButton').click();
	        sleep(2);

	        // open LD Create modal
	        element('#createLd').click();
	        sleep(1);

	        verify('ldName', badPatternText, goodPatternText, '#ldNamePatternErr', 'The design name cannot contain this symbol');
	        verify('ldName', ldNameTooLong, ldNameMaxAllowed, '#ldNameLengthErr', 'The design name cannot be longer than 50 characters');
	        verify('ldScope', badPatternText, goodPatternText, '#ldScopePatternErr', 'The design scope cannot contain this symbol');
	        verify('ldScope', ldNameTooLong, ldNameMaxAllowed, '#ldScopeLengthErr', 'The design scope cannot be longer than 50 characters');
	        verify('ldTopic', badPatternText, goodPatternText, '#topicPatternErr', 'A topic cannot contain this symbol');
	        verify('ldTopic', topicTooLong, topicMaxAllowed, '#topicLengthErr', 'A topic cannot be longer than 255 characters');
	        verify('ldObjective', badPatternText, goodPatternText, '#objectivePatternErr', 'An objective cannot contain this symbol');
	        verify('ldObjective', topicTooLong, topicMaxAllowed, '#objectiveLengthErr', 'An objective cannot be longer than 255 characters');
	        verify('ldRequisite', badPatternText, goodPatternText, '#prereqPatternErr', 'A pre-requisite cannot contain this symbol');
	        verify('ldRequisite', topicTooLong, topicMaxAllowed, '#prereqLengthErr', 'A pre-requisite cannot be longer than 255 characters');
	        verify('ldStudentsDescr', badPatternText, goodPatternText, '#ldStudentDescrPatternErr', "Students' description cannot contain this symbol");
	        verify('ldStudentsDescr', studentsDescrTooLong, studentsDescrMaxAllowed, '#ldStudentDescrLengthErr', "Students' description cannot be longer than 500 characters");

	        // Now that all the fields are filled out, blank them out and verify required (except prereq)
	        verify('ldName', "", goodPatternText, '#ldNameReqErr', 'Required');
	        verify('ldScope', "", goodPatternText, '#ldScopeReqErr', 'Required');
	        verify('ldTopic', "", goodPatternText, '#topicReqErr', 'Required');
	        verify('ldObjective', "", goodPatternText, '#objectiveReqErr', 'Required');
	        verify('ldStudentsDescr', "", goodPatternText, '#studentsDescrReqErr', 'Required');

	        element("#cancelCreateLd").click();

	        // Logout
	        element('#userActionsMenu').click();
	        element('#logoutLink').click();
		});

	});

});