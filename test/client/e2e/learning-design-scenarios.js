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

        // Verify total results (this is the number of public LDs)
        expect(repeater('.ld-border').count()).toBe(23);

        // Verify first LD
        var expectedLd1Data = ["Learningà Designè Titleì Demoò 1ù é","A1","A2","Lesson","Mario","Rossi"];
        expect(repeater('.ld-border').row(0)).toEqual(expectedLd1Data);

        // Verify another LD
        var expectedLd5Data = ["Learning Design Title Demo 5","A1","A2","B1","B2","C1","C2","Semester","Sara","Neri"];
        expect(repeater('.ld-border').row(3)).toEqual(expectedLd5Data);

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

        // Verify subjects (a.k.a. topics)
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

        // TODO: Verify modal window content 

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
        sleep(1);

        // Verify detail view
        expect(browser().location().url()).toBe('/ld/3');
        expect(binding('learningDesign.ld_name')).toBe('Learning Design Title Demo 3');
        expect(binding('learningDesign.ld_students_profile')).toBe('20 studenti adolescenti di livello B1');
        expect(binding('learningDesign.ld_scope')).toBe('Semester');
        expect(repeater('.qceritem').column('qcer.qcer_name')).toEqual(["C1"]);

        // Verify subjects
        expect(repeater('.subjects li').count()).toBe(1);
        expect(repeater('.subjects li').column('subject.subject_name')).toEqual(["Topic 3"]);

        // Verify objectives
        expect(repeater('.objectives li').count()).toBe(2);
        expect(repeater('.objectives li').column('objective.objective_descr')).toEqual(["Objective 3", "Objective 6"]);

        // Verify prerequisites
        expect(repeater('.prerequisites li').count()).toBe(1);
        expect(repeater('.prerequisites li').column('prereq.prereq_name')).toEqual(["Objective 3"]);

        // Verify Global View
        expect(repeater('.levelBox').count()).toBe(4);
        expect(repeater('.groupBox3').count()).toBe(1);
        expect(repeater('.actBox').count()).toBe(10);

        // Verify Textual View
        element("#textualTab").click();
        var expectedLd2TextualViewLevel1 = [
        	"Support Activity 22","Online","1 mo. 15 d.","PAIR","Smartphone","Whiteboard",
        	"Practical description: what to do for the execution of this activity",
        	"Pedagogical Description: how to obtain better results and improve learning during the activity"
        ];
        expect(repeater(".teacherLevel").row(0)).toEqual(expectedLd2TextualViewLevel1);


        // Verify Global View after other Views
        element("#globalTab").click();
        expect(repeater('.levelBox').count()).toBe(4);
        expect(repeater('.groupBox3').count()).toBe(1);
        expect(repeater('.actBox').count()).toBe(10);

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
    });

}); 