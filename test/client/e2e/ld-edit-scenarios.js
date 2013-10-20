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

        // TODO: Edit Topic and other typeaheads

        // Make this LD public 
        input('ldPublicationFlag').check();

        // Verify this modified LD is first result (scope is still Module because blur event not triggered)
        element('#homeLink').click();
        sleep(0.5);
        expect(browser().location().url()).toBe('/'); 
        expect(repeater('.ld-border').row(0)).toEqual(["Learning Design Title Demo 18","A1","A2","Module","Mario","Rossi"]);

        // TODO Click on ld, verify we're on view page and verify all other modified data

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