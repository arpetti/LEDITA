'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Learning Design', function() {

    it('Logged in user can see all learning designs', function() {
        var existingUserName = testUsers.getUserName;
        var existingUserPassword = testUsers.getUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        // Verify results
        expect(repeater('#ldlist .ld-item').count()).toBeGreaterThan(5);

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
        element('#ldlist .ld-item:nth-child(1) .ld-center a').click();
        sleep(2);

        // Verify detail view
        expect(browser().location().url()).toBe('/ld/1');
        expect(binding('learningDesign.ld_name')).toBe('Learning Design Title Demo 1');
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

        // Verify Teacher View
        element("#teacherTab").click();
        var expectedLd1TeacherViewLevel1 = [
            "Support Activity 1","Online", "1 mo. 15 d.", "ALL", "Internet",
            "Didactical resource name 3", "video", "Description of the didactical resource number 3",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity"];
        expect(repeater(".teacherLevel").row(0)).toEqual(expectedLd1TeacherViewLevel1);
        
        var expectedLd1TeacherViewLevel2 = [
            "", "Learning Activity 1", "Face to face", "15 min.", "ALL", "Tablet",
            "Didactical resource name 1", "website", "Description of the didactical resource number 1",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",
            
            "Learning Activity 2","Face to face", "2 h.", "ALL", "PC", "Smartphone",
            "Didactical resource name 2", "document", "Carlo Neri", "Description of the didactical resource number 2",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",

            "Learning Activity 3","Online","30 min.","ALL","Whiteboard",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity",

            "Learning Activity 4","Face to face","2 d.","ALL",
            "Practical description: what to do for the execution of this activity",
            "Pedagogical Description: how to obtain better results and improve learning during the activity"];
        expect(repeater(".teacherLevel").row(1)).toEqual(expectedLd1TeacherViewLevel2);

        // Verify Student View
        element("#studentTab").click();
        var expectedLd1StudentViewLevel1 = [
            "Support Activity 1","Online", "1 mo. 15 d.", "ALL", "Internet",
            "Didactical resource name 3", "video", "Description of the didactical resource number 3",
            "Practical description: what to do for the execution of this activity"];
        expect(repeater(".studentLevel").row(0)).toEqual(expectedLd1StudentViewLevel1);

        var expectedLd1StudentViewLevel2 = [
            "", "Learning Activity 1", "Face to face", "15 min.", "ALL", "Tablet",
            "Didactical resource name 1", "website", "Description of the didactical resource number 1",
            "Practical description: what to do for the execution of this activity",
            
            "Learning Activity 2","Face to face", "2 h.", "ALL", "PC", "Smartphone",
            "Didactical resource name 2", "document", "Carlo Neri", "Description of the didactical resource number 2",
            "Practical description: what to do for the execution of this activity",

            "Learning Activity 3","Online","30 min.","ALL","Whiteboard",
            "Practical description: what to do for the execution of this activity",

            "Learning Activity 4","Face to face","2 d.","ALL",
            "Practical description: what to do for the execution of this activity"];
        expect(repeater(".studentLevel").row(1)).toEqual(expectedLd1StudentViewLevel2);

        // Verify Global View after other Views
        element("#globalTab").click();
        expect(repeater('.levelBox').count()).toBe(6);
        expect(repeater('.groupBox2').count()).toBe(2);
        expect(repeater('.actBox').count()).toBe(10);
        sleep(2);


        /*FIXME: this part take the first node and not the one of the selector*/
        element("#node .actBox").click('Support Activity 2');
        expect(binding('node.node_name')).toBe('Support Activity 1');
        expect(binding('node.modality')).toBe('Online');
        expect(binding('node | durationDisplay')).toBe('1 mo. 15 d.');
        expect(binding('node.org_label')).toBe('ALL');
 expect(binding('tech.technology_name')).toBe('Internet');
 expect(binding('resource.resource_name')).toBe('Didactical resource name 3');
        expect(binding('node.pract_descr')).toBe('Practical description: what to do for the execution of this activity');
        expect(binding('node.edu_descr')).toBe('Pedagogical Description: how to obtain better results and improve learning during the activity');

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();
    });

    it('Renders Learning Design detail for LD having no child LDs', function() {
        var existingUserName = testUsers.getUserName;
        var existingUserPassword = testUsers.getUserPassword;

        browser().navigateTo('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();
        sleep(2);

        // Click on second result 
        element('#ldlist .ld-item:nth-child(2) .ld-center a').click();
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
        expect(repeater('.prerequisites li').column('prereq.prereq_name')).toEqual(["Learning Design Title Demo 1"]);

        // Verify Global View
        expect(repeater('.levelBox').count()).toBe(4);
        expect(repeater('.groupBox1').count()).toBe(2);
        expect(repeater('.actBox').count()).toBe(10);

        // Verify Teacher View
        element("#teacherTab").click();
        var expectedLd2TeacherViewLevel1 = [
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
        expect(repeater(".teacherLevel").row(0)).toEqual(expectedLd2TeacherViewLevel1);

        // Verify Student View
        element("#studentTab").click();
        var expectedLd2StudentViewLevel1 = [
            "","Learning Activity 8","Face to face","15 min.","INDIVIDUAL",
            "Practical description: what to do for the execution of this activity",

            "Learning Activity 9","Face to face","2 h.","INDIVIDUAL","PC","Smartphone","Tablet",
            "Didactical resource name 5","website","www.copy.com","Description of the didactical resource number 5",
            "Practical description: what to do for the execution of this activity",

            "Group 3 Name","Learning Activity 10","Online","30 min.","INDIVIDUAL",
            "Practical description: what to do for the execution of this activity",

            "Learning Activity 11","Face to face","2 d.","INDIVIDUAL",
            "Didactical resource name 6","image","Description of the didactical resource number 6",
            "Practical description: what to do for the execution of this activity"];
        expect(repeater(".studentLevel").row(0)).toEqual(expectedLd2StudentViewLevel1);

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