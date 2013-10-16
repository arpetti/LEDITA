'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Edit Learning Design', function() {

	it('Updates Qcers', function() {

		var marioUser = testUsers.getMarioUserName;
   	 	var marioPswd = testUsers.getMarioUserPassword;
   	 	var privateLdOwnedByMario = 18;

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
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual(['Topic 3']);
        expect(repeater('.objectives li').count()).toBe(2);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual(['Objective 3','Objective 6']);
        expect(repeater('.prerequisites li').count()).toBe(0);
        expect(input('learningDesign.ld_students_profile').val()).toBe('20 studenti adolescenti di livello B1');

        // TODO Figure out how to verify checkboxes in Angular scenario
        expect(input('ldPublicationFlag').val()).toBe('on'); 
        expect(input('selectedQcers[qceropt.id]').val()).toBe('on'); 

        // edit qcers - click on second one
        element('.titleQcer input:eq(1)').click();
        // TODO: Figure out how to verify update was successful

         // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();

	});

});