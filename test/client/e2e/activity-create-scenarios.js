'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Activity Create Scenarios', function() {

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	// DO NOT edit anything from this public LD, otherwise will appear first in list and mess up other tests!
	it('Navigates from Home to Edit LD', function() {

		// Login Sara
		var existingUserName = testUsers.getUserName;
    var existingUserPassword = testUsers.getUserPassword;
    browser().navigateTo('/login');
    expect(browser().location().url()).toBe('/login');
    input('username').enter(existingUserName);
    input('password').enter(existingUserPassword);
    element('#loginButton').click();

    // Select an LD 
    element('#ldlist .ld-item:nth-child(17) a .ld-center').click();
    sleep(1);
    expect(browser().location().url()).toBe('/ld/23');
    
    // Edit this LD
        expect(element('#editLdButton').css('display')).toBe('block');
    element('#editLdLink').click();
    sleep(0.5);
    expect(browser().location().url()).toBe('/ldedit/23');

    // Add Activity
    element('#createActivity').click();
    sleep(0.3);
    input('actName').enter('Saras new activity created in e2e test');

    // Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();
	});

	it('Create a new Activity for Private LD', function() {

		// Login Sara
		var privateLdOwnedBySara = 22;
		var existingUserName = testUsers.getUserName;
    var existingUserPassword = testUsers.getUserPassword;
    browser().navigateTo('/login');
    input('username').enter(existingUserName);
    input('password').enter(existingUserPassword);
    element('#loginButton').click();
    sleep(2);

    // Edit a private LD owned by Sara
    browser().navigateTo('/ldedit/' + privateLdOwnedBySara);
    sleep(0.5);
    expect(browser().location().url()).toBe('/ldedit/' + privateLdOwnedBySara);

    // Verify LD data
    expect(input('learningDesign.ld_name').val()).toBe('Learning Design Title Demo 22');
    expect(input('learningDesign.ld_scope').val()).toBe('Module');
    expect(repeater('.levelBoxEdit').count()).toBe(0); // LD has no nodes

    // Add Activity
    element('#createActivity').click();
    sleep(0.2);
    input('actName').enter('Saras new activity created in e2e test');
    input('modality').select('2'); //Online
    input('dur_mon').enter('1');
    input('dur_d').enter('2');
    input('dur_h').enter('3');
    input('dur_min').enter('4');
    input('technology').enter('Whiteboard');
    input('pract_descr').enter('Activity Practical Description from e2e test');
    input('edu_descr').enter('Activity Education Description from e2e test');

    // Verify additional group details are hidden/displayed with option selection
    expect(element('#actOrgGroupDetails').css('display')).toBe('none');
    input('org').select('4'); //Group
    sleep(0.1); 
    expect(element('#actOrgGroupDetails').css('display')).toBe('block');
    input('group_number').enter('8');
    input('people_per_group').enter('4');
    
    // Add a resource
    element('#addResource').click();
    sleep(0.2);
    input('resourceName').enter('Resource name from e2e test');
    input('resourceType').enter('document');
    input('resourceDescr').enter('Resource description');
    input('resourceLink').enter('http://ledita.resource');
    element('#confirmAddResource').click();
    sleep(0.1);

    // Verify resource details displayed in Activity Create Modal
    var expectedResourceData = ["Resource name from e2e test","document","Resource description"];
    expect(repeater('.rowResLink').count()).toBe(1);
    expect(repeater('.rowResLink').row(0)).toEqual(expectedResourceData);

    element('#confirmCreateActivity').click();
    sleep(0.5);

    // Verify Activity Box node is displayed in LD structure
    var expectedActivityBoxData = ["Saras new activity created in e2e test","1 m. 2 g. 3 h. 4 min.","Gruppi"];
    expect(repeater('.levelBoxEdit').count()).toBe(1);
    expect(repeater('.levelBoxEdit').row(0)).toEqual(expectedActivityBoxData);
    
    // Verify Activity Details modal
    element('.openNodeModal').click();
    expect(binding('selectedNode.displayName')).toEqual('Saras new activity created in e2e test');
    expect(binding('node.modality')).toEqual('Online');
    expect(binding('node.org_label')).toEqual('Gruppi');
    // Not sure why there are multiple repeaters in the dom for the same entry in modal?
    expect(repeater('.techRepeater').row(3)).toEqual(["Whiteboard"]);
    expect(repeater('.resourceRepeater').row(3)).toEqual(expectedResourceData);

 		// Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();
	});

});