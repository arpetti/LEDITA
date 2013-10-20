'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Edit Learning Design', function() {

	it('Updates are saved', function() {

		var verifyTypeAheadValues = function(cssSelector, message, expectedValues) {
			for (var i=0; i<expectedValues.length; i++) {
				expect(repeater(cssSelector, message).row(expectedValues[i].rowNum)).toEqual([expectedValues[i].value]);
			};
		};

		var marioUser = testUsers.getMarioUserName;
   	 	var marioPswd = testUsers.getMarioUserPassword;
   	 	var privateLdOwnedByMario = 18;
   	 	var scopeTypeaheadMatch = "Lesson";
   	 	var topicTypeaheadMatch = "Topic 1";
   	 	var objectiveTypeaheadMatch = "Frasi idiomatiche sui sentimenti";
   	 	var prerequisiteTypeaheadMatch = "Registro formale e informale con i sentimenti";

   	 	// Login
   	 	browser().navigateTo('/login');
        input('username').enter(marioUser);
        input('password').enter(marioPswd);
        element('#loginButton').click();
        sleep(2);

        // Navigate to edit page (for now url access, future will have button or link)
        browser().navigateTo('/ldedit/' + privateLdOwnedByMario);
        sleep(0.5);
        expect(browser().location().url()).toBe('/ldedit/' + privateLdOwnedByMario);

        // Verify LD data
        expect(input('learningDesign.ld_name').val()).toBe('Learning Design Title Demo 18');
        expect(input('learningDesign.ld_scope').val()).toBe('Module');
        expect(repeater('.subjects li').count()).toBe(1);
        expect(repeater('.subjects li').column('topic')).toEqual(['Topic 3']);
        expect(repeater('.objectives li').count()).toBe(2);
        expect(repeater('.objectives li').column('objective')).toEqual(['Objective 3','Objective 6']);
        expect(repeater('.prerequisites li').count()).toBe(0);
        expect(input('learningDesign.ld_students_profile').val()).toBe('20 studenti adolescenti di livello B1');

        // Select second Qcer
        element('.titleQcer input:eq(1)').click();

        // Verify Scope Typeahead
        expect(element('#scopeFormSection .typeahead', 'scope typeahead hidden').css('display')).toBe('none');
        input('learningDesign.ld_scope').enter('L');
        sleep(0.5);
        expect(element('#scopeFormSection .typeahead', 'scope typeahead is displayed').css('display')).toBe('block');
        verifyTypeAheadValues('#scopeFormSection .ng-scope', 'scope typeahead', [
        	{rowNum: 0, value: "<strong>L</strong>esson"}, 
        	{rowNum: 1, value: "<strong>L</strong>ezione"}, 
        	{rowNum: 2, value: "Modu<strong>l</strong>e"}
        ]);
        element('#scopeFormSection li a').click(); 
        expect(input('learningDesign.ld_scope').val()).toBe(scopeTypeaheadMatch);

        // Add Topic using Typeahead
        expect(element('#editTopics .typeahead', 'topic typeahead hidden').css('display')).toBe('none');
        input('ldTopic').enter('Topic');
        sleep(0.5);
        expect(element('#editTopics .typeahead', 'topic typeahead is displayed').css('display')).toBe('block');
        verifyTypeAheadValues('#editTopics .ng-scope', 'topic typeahead', [
        	{rowNum: 0, value: "<strong>Topic</strong> 1"}, 
        	{rowNum: 1, value: "<strong>Topic</strong> 2"}, 
        	{rowNum: 2, value: "<strong>Topic</strong> 3"},
        	{rowNum: 3, value: "<strong>Topic</strong> 4"},
        	{rowNum: 4, value: "<strong>Topic</strong> 5"}
        ]);
        element('#editTopics li:eq(0) a').click(); 
        expect(repeater('#editTopics li').count()).toBe(2);
        expect(repeater('#editTopics li').column('topic')).toEqual(["Topic 3", topicTypeaheadMatch]);

        // Add Objective using Typeaead
        expect(element('#editObjectives .typeahead', 'objective typeahead hidden').css('display')).toBe('none');
        input('ldObjective').enter('Frasi');
        sleep(0.5);
        expect(element('#editObjectives .typeahead', 'objective typeahead is displayed').css('display')).toBe('block');
        verifyTypeAheadValues('#editObjectives .ng-scope', 'objective typeahead', [
        	{rowNum: 0, value: "<strong>Frasi</strong> idiomatiche sui sentimenti"}
        ]);
        element('#editObjectives li:eq(0) a').click(); 
        expect(repeater('#editObjectives li').count()).toBe(3);
        expect(repeater('#editObjectives li').column('objective')).toEqual(
        	["Objective 3", "Objective 6", objectiveTypeaheadMatch]);

        // Add Prerequisite using Typeahead
        expect(element('#editPrerequisites .typeahead', 'prereq typeahead hidden').css('display')).toBe('none');
        input('ldRequisite').enter('regi');
        sleep(0.5);
        expect(element('#editPrerequisites .typeahead', 'prereq typeahead displayed').css('display')).toBe('block');
        verifyTypeAheadValues('#editPrerequisites .ng-scope', 'prereq typeahead', [
        	{rowNum: 0, value: "<strong>Regi</strong>stro formale e informale con i sentimenti"}
        ]);
        element('#editPrerequisites li:eq(0) a').click(); 
        expect(repeater('#editPrerequisites li').count()).toBe(1);
        expect(repeater('#editPrerequisites li').column('prereq')).toEqual([prerequisiteTypeaheadMatch]);

        // Make this LD public 
        input('ldPublicationFlag').check();

        // Verify this modified LD is first result (scope is still Module because blur event not triggered)
        element('#homeLink').click();
        sleep(0.5);
        expect(browser().location().url()).toBe('/'); 
        expect(repeater('.ld-border').row(0)).toEqual(["Learning Design Title Demo 18","A1","A2","Module","Mario","Rossi"]);

        // Click on detail view and verify modified detail data
        element('#ldlist .ld-item:nth-child(1) a .ld-center').click();
        sleep(1);
        expect(browser().location().url()).toBe('/ld/' + privateLdOwnedByMario);
        expect(binding('learningDesign.ld_name')).toBe('Learning Design Title Demo 18');
        expect(repeater('.qceritem').column('qcer.qcer_name')).toEqual(["A1", "A2"]);
        expect(repeater('.subjects li').count()).toBe(2);
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual([topicTypeaheadMatch, "Topic 3"]);
        expect(repeater('.objectives li').count()).toBe(3);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual(
        	["Objective 3", "Objective 6", objectiveTypeaheadMatch]);
        expect(repeater('.prerequisites li').count()).toBe(1);
        expect(repeater('.prerequisites li').column('prereq.prereq_name')).toEqual([prerequisiteTypeaheadMatch]);


        // Go back to Edit Page and make LD Private
        browser().navigateTo('/ldedit/' + privateLdOwnedByMario);
        sleep(0.5);
        expect(browser().location().url()).toBe('/ldedit/' + privateLdOwnedByMario);
        input('ldPublicationFlag').check();

        // Verify it no longer appears on homepage
        element('#homeLink').click();
        sleep(0.5);
        expect(browser().location().url()).toBe('/'); // This might not work on Travis?
        var expectedLd1Data = ["Learningà Designè Titleì Demoò 1ù é","A1","A2","Lesson","Mario","Rossi"];
        expect(repeater('.ld-border').row(0)).toEqual(expectedLd1Data);

         // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
	});

});