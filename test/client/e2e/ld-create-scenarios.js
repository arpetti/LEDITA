'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Create a new Learning Design', function() {

	afterEach(function() {
		browser().navigateTo('/logout');
	});

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

	it('Creates LD with typeahead matches', function() {

		var newLdName = "Learning Design E2E Test Typeahead";
		var newLdStudentsDescription = "Students Description E2E Test Typeahead";
		var scopeTypeaheadMatch = "Lesson";
		var topicTypeaheadMatch = "Topic 2";
		var objectiveTypeaheadMatch = "Frasi idiomatiche sui sentimenti";

		var verifyTypeAheadValues = function(cssSelector, message, expectedValues) {
			for (var i=0; i<expectedValues.length; i++) {
				expect(repeater(cssSelector, message).row(expectedValues[i].rowNum)).toEqual([expectedValues[i].value]);
			};
		};

		browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        element('#createLd').click();

        input('ldName').enter(newLdName);
        input('selectedQcers[qceropt.id]').check();  
        input('ldStudentsDescr').enter(newLdStudentsDescription);
        
        // Verify Scope Typeahead
        expect(element('#scopeSection .typeahead', 'scope typeahead hidden').css('display')).toBe('none');
        input('ldScope').enter('X');
        sleep(0.5);
        expect(element('#scopeSection .typeahead', 'scope typeahead hidden when no match').css('display')).toBe('none');
        input('ldScope').enter('L');
        sleep(0.5);
        expect(element('#scopeSection .typeahead', 'scope typeahead is displayed').css('display')).toBe('block');
        verifyTypeAheadValues('#scopeSection .ng-scope', 'scope typeahead', [
        	{rowNum: 0, value: "<strong>L</strong>esson"}, 
        	{rowNum: 1, value: "<strong>L</strong>ezione"}, 
        	{rowNum: 2, value: "Modu<strong>l</strong>e"}
        ]);

        // Pick the first match
        element('#scopeSection li a').click(); 
        expect(input('ldScope').val()).toBe(scopeTypeaheadMatch);

        // Verify Topic Typeahead
        expect(element('#topicSection .typeahead', 'topic typeahead hidden').css('display')).toBe('none');
        input('ldTopic').enter('Z');
        sleep(0.5)
        expect(element('#topicSection .typeahead', 'topic typeahead hidden when no match').css('display')).toBe('none');
        input('ldTopic').enter('Topic');
        sleep(0.5);
        expect(element('#topicSection .typeahead', 'topic typeahead is displayed').css('display')).toBe('block');
        verifyTypeAheadValues('#topicSection .ng-scope', 'topic typeahead', [
        	{rowNum: 0, value: "<strong>Topic</strong> 1"}, 
        	{rowNum: 1, value: "<strong>Topic</strong> 2"}, 
        	{rowNum: 2, value: "<strong>Topic</strong> 3"},
        	{rowNum: 3, value: "<strong>Topic</strong> 4"},
        	{rowNum: 4, value: "<strong>Topic</strong> 5"}
        ]);

        // Pick the first match and verify tags
        element('#topicSection li a').click(); 
        expect(repeater('#topicTags li').count()).toBe(1);
        expect(repeater('#topicTags li').column('topic')).toEqual(["Topic 1"]);

        // Pick second match and verify tags
        input('ldTopic').enter('Topic');
        sleep(0.5);
        element('#topicSection li:eq(1) a').click(); 
        expect(repeater('#topicTags li').count()).toBe(2);
        expect(repeater('#topicTags li').column('topic')).toEqual(["Topic 1", "Topic 2"]);

        // Remove first topic tag
        element('#topicTags a:eq(0)').click();
        expect(repeater('#topicTags li').count()).toBe(1);
        expect(repeater('#topicTags li').column('topic')).toEqual([topicTypeaheadMatch]);

        // Verify Objective typeahead
        expect(element('#objectiveSection .typeahead', 'objective typeahead hidden').css('display')).toBe('none');
        input('ldObjective').enter('Frasi');
        sleep(0.5);
        expect(element('#objectiveSection .typeahead', 'objective typeahead is displayed').css('display')).toBe('block');
        verifyTypeAheadValues('#objectiveSection .ng-scope', 'objective typeahead', [
        	{rowNum: 0, value: "<strong>Frasi</strong> idiomatiche sui sentimenti"}
        ]);

         // Pick the first (only) match and verify tags
        element('#objectiveSection li a').click(); 
        expect(repeater('#objectiveTags li').count()).toBe(1);
        expect(repeater('#objectiveTags li').column('objective')).toEqual([objectiveTypeaheadMatch]);

        element("#confirmCreateLD").click();
        sleep(0.5);

        expect(browser().location().url()).toMatch('/ldedit/');
        expect(input('learningDesign.ld_name').val()).toBe(newLdName);
        expect(input('learningDesign.ld_scope').val()).toBe(scopeTypeaheadMatch);
        expect(repeater('.subjects li').count()).toBe(1);
        expect(repeater('.subjects li').column('topic')).toEqual([topicTypeaheadMatch]);
        expect(repeater('.objectives li').count()).toBe(1);
        expect(repeater('.objectives li').column('objective')).toEqual([objectiveTypeaheadMatch]);
        expect(repeater('.prerequisites li').count()).toBe(0);
        expect(input('learningDesign.ld_students_profile').val()).toBe(newLdStudentsDescription);

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
        sleep(0.5);

        // fill out the form
        input('ldName').enter(newLdName);
        input('selectedQcers[qceropt.id]').check();  // this checks them all
        input('ldScope').enter(newLdScope);
        input('ldTopic').enter(newTopic);
        input('ldObjective').enter(newObjective);
        input('ldRequisite').enter(newPrereq);
        input('ldStudentsDescr').enter(newLdStudentsDescription);
        
        element("#confirmCreateLD").click();
        sleep(0.5);

        expect(browser().location().url()).toMatch('/ldedit/');
        expect(input('learningDesign.ld_name').val()).toBe(newLdName);
        expect(input('learningDesign.ld_scope').val()).toBe(newLdScope);
        expect(repeater('.subjects li').count()).toBe(1);
        expect(repeater('.subjects li').column('topic')).toEqual([newTopic]);
        expect(repeater('.objectives li').count()).toBe(1);
        expect(repeater('.objectives li').column('objective')).toEqual([newObjective]);
        expect(repeater('.prerequisites li').count()).toBe(1);
        expect(repeater('.prerequisites li').column('prereq')).toEqual([newPrereq]);
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
        expect(repeater('.subjects li').column('topic')).toEqual([newTopic]);
        expect(repeater('.objectives li').count()).toBe(1);
        expect(repeater('.objectives li').column('objective')).toEqual([newObjective]);
        expect(repeater('.prerequisites li').count()).toBe(0);
        expect(input('learningDesign.ld_students_profile').val()).toBe(newLdStudentsDescription);
        
        // TODO: Verify qcers (need to figure out data binding for checkboxes)

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
	});

	describe('Server side validation', function() {

		afterEach(function() {
			browser().navigateTo('/logout');
		});

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
		    expect(element('#ldCreateErrors').text()).toMatch('Selezionare almeno un livello QCER.');

		    element("#cancelCreateLd").click();

	        // Logout
	        element('#userActionsMenu').click();
	        element('#logoutLink').click();
		});

	});

	describe('Client side Validation', function() {

		afterEach(function() {
			browser().navigateTo('/logout');
		});

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

	        verify('ldName', badPatternText, goodPatternText, '#ldNamePatternErr', 'Simbolo non permesso');
	        verify('ldName', ldNameTooLong, ldNameMaxAllowed, '#ldNameLengthErr', 'Massimo 50 caratteri');
	        verify('ldScope', badPatternText, goodPatternText, '#ldScopePatternErr', 'Simbolo non permesso');
	        verify('ldScope', ldNameTooLong, ldNameMaxAllowed, '#ldScopeLengthErr', 'Massimo 50 caratteri');
	        verify('ldTopic', badPatternText, goodPatternText, '#topicPatternErr', 'Simbolo non permesso');
	        verify('ldTopic', topicTooLong, topicMaxAllowed, '#topicLengthErr', 'Massimo 255 caratteri');
	        verify('ldObjective', badPatternText, goodPatternText, '#objectivePatternErr', 'Simbolo non permesso');
	        verify('ldObjective', topicTooLong, topicMaxAllowed, '#objectiveLengthErr', 'Massimo 255 caratteri');
	        verify('ldRequisite', badPatternText, goodPatternText, '#prereqPatternErr', 'Simbolo non permesso');
	        verify('ldRequisite', topicTooLong, topicMaxAllowed, '#prereqLengthErr', 'Massimo 255 caratteri');
	        verify('ldStudentsDescr', badPatternText, goodPatternText, '#ldStudentDescrPatternErr', "Simbolo non permesso");
	        verify('ldStudentsDescr', studentsDescrTooLong, studentsDescrMaxAllowed, '#ldStudentDescrLengthErr', "Massimo 500 caratteri");

	        // Now that all the fields are filled out, blank them out and verify required (except prereq)
	        verify('ldName', "", goodPatternText, '#ldNameReqErr', 'Necessario');
	        verify('ldScope', "", goodPatternText, '#ldScopeReqErr', 'Necessario');
//	        verify('ldTopic', "", goodPatternText, '#topicReqErr', 'Necessario');
//	        verify('ldObjective', "", goodPatternText, '#objectiveReqErr', 'Necessario');
	        verify('ldStudentsDescr', "", goodPatternText, '#studentsDescrReqErr', 'Necessario');

	        element("#cancelCreateLd").click();

	        // Logout
	        element('#userActionsMenu').click();
	        element('#logoutLink').click();
		});

	});

});