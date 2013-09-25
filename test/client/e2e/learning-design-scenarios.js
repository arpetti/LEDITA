'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Learning Design', function() {

    it('Logged in user can see all learning designs on home page', function() {
        var existingUserName = testUsers.getUserName;
        var existingUserPassword = testUsers.getUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        // Verify total results
        expect(repeater('.ld-border').count()).toEqual(30);

        // Verify first LD
        var expectedLd1Data = ["Learningà Designè Titleì Demoò 1ù é","A1","A2","Lesson","Mario","Rossi"];
        expect(repeater('.ld-border').row(0)).toEqual(expectedLd1Data);

        // Verify another LD
        var expectedLd5Data = ["Learning Design Title Demo 5","A1","A2","B1","B2","C1","C2","Semester","Sara","Neri"];
        expect(repeater('.ld-border').row(4)).toEqual(expectedLd5Data);

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
    });

    it('Clicking on Learning Design displays detail view',function() {
        var existingUserName = testUsers.getUserName;
        var existingUserPassword = testUsers.getUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        // Click on first result 
        element('#ldlist .ld-item:nth-child(1) a .ld-center').click();
        sleep(2);

        // Verify detail view
        expect(browser().location().url()).toBe('/ld/1');
        expect(binding('learningDesign.ld_name')).toBe('Learningà Designè Titleì Demoò 1ù é');
        expect(binding('learningDesign.ld_students_profile')).toBe('20 studenti adolescenti di livello B1');
        expect(binding('learningDesign.ld_scope')).toBe('Lesson');
        expect(repeater('.qceritem').column('qcer.qcer_name')).toEqual(["A1", "A2"]);

        // Verify subjects
        expect(repeater('.subjects li').count()).toBe(2);
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual(["Topic 1", "Topic 5"]);

        // Verify objectives
        expect(repeater('.objectives li').count()).toBe(2);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual(["Objective 1", "Objective 6"]);

        // Verify prerequisites
        expect(repeater('.prerequisites li').count()).toBe(2);
        expect(repeater('.prerequisites li').column('prereq.prereq_name')).toEqual(["Objective 1", "Objective 2"]);

        // Verify Global View
        expect(repeater('.levelBox').count()).toBe(6);
        expect(repeater('.groupBox2').count()).toBe(2);
        expect(repeater('.actBox').count()).toBe(10);

        // Verify Textual View
        element("#textualTab").click();
        var expectedLd1TextualViewLevel1 = [
            "Support Activity 1","Online", "1 mo. 15 d.", "ALL", "Internet",
            "Didactical resource name 3", "video", "Description of the didactical resource number 3",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity"];
        expect(repeater(".teacherLevel").row(0)).toEqual(expectedLd1TextualViewLevel1);
        
        var expectedLd1TextualViewLevel2 = [
            "", "Learning Activity 1", "Face to face", "15 min.", "ALL", "Tablet",
            "Didactical resource name 1", "website", "Description of the didactical resource number 1",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",
            
            "Learning Activity 2","Face to face", "", "ALL", "PC", "Smartphone",
            "Didactical resource name 2", "document", "Carlo Neri", "Description of the didactical resource number 2",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",

            "Learning Activity 3","Online","30 min.","ALL","Whiteboard",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",

            "Learning Activity 4","Face to face","2 d.","ALL",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity"];
        expect(repeater(".teacherLevel").row(1)).toEqual(expectedLd1TextualViewLevel2);


        // Verify Global View after other Views
        element("#globalTab").click();
        expect(repeater('.levelBox').count()).toBe(6);
        expect(repeater('.groupBox2').count()).toBe(2);
        expect(repeater('.actBox').count()).toBe(10);
        sleep(2);

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
    });

    it('Shows activity details in modal window', function() {
        var existingUserName = testUsers.getUserName;
        var existingUserPassword = testUsers.getUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        // Click on first result 
        element('#ldlist .ld-item:nth-child(1) a .ld-center').click();
        sleep(2);

        // Verify detail view
        expect(browser().location().url()).toBe('/ld/1');

        // Click on a child link
        element(".childModalLink").click();

        // Verify modal window content 
      <!-- TODO: test for modal -->


        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
    });

    it('Displays Learning Design detail for LD having no child LDs', function() {
        var existingUserName = testUsers.getUserName;
        var existingUserPassword = testUsers.getUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        // Click on second result 
        element('#ldlist .ld-item:nth-child(2) a .ld-center').click();
        sleep(2);

        // Verify detail view
        expect(browser().location().url()).toBe('/ld/2');
        expect(binding('learningDesign.ld_name')).toBe('Learning Design Title Demo 2');
        expect(binding('learningDesign.ld_students_profile')).toBe('20 studenti adolescenti di livello B1');
        expect(binding('learningDesign.ld_scope')).toBe('Module');
        expect(repeater('.qceritem').column('qcer.qcer_name')).toEqual(["B1"]);

        // Verify subjects
        expect(repeater('.subjects li').count()).toBe(2);
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual(["Topic 2", "Topic 4"]);

        // Verify objectives
        expect(repeater('.objectives li').count()).toBe(2);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual(["Objective 2", "Objective 6"]);

        // Verify prerequisites
        expect(repeater('.prerequisites li').count()).toBe(1);
        expect(repeater('.prerequisites li').column('prereq.prereq_name')).toEqual(["Learningà Designè Titleì Demoò 1ù é"]);

        // Verify Global View
        expect(repeater('.levelBox').count()).toBe(4);
        expect(repeater('.groupBox1').count()).toBe(2);
        expect(repeater('.actBox').count()).toBe(10);

        // Verify Textual View
        element("#textualTab").click();
        var expectedLd2TextualViewLevel1 = [
            "","Learning Activity 8","Face to face","15 min.","INDIVIDUAL",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",

            "Learning Activity 9","Face to face","2 h.","INDIVIDUAL","PC","Smartphone","Tablet",
            "Didactical resource name 5","website","www.copy.com","Description of the didactical resource number 5",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",

            "Group 3 Name","Learning Activity 10","Online","30 min.","INDIVIDUAL",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",

            "Learning Activity 11","Face to face","2 d.","INDIVIDUAL",
            "Didactical resource name 6","image","Description of the didactical resource number 6",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity"];
        expect(repeater(".teacherLevel").row(0)).toEqual(expectedLd2TextualViewLevel1);


        // Verify Global View after other Views
        element("#globalTab").click();
        expect(repeater('.levelBox').count()).toBe(4);
        expect(repeater('.groupBox1').count()).toBe(2);
        expect(repeater('.actBox').count()).toBe(10);

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
    });

}); 