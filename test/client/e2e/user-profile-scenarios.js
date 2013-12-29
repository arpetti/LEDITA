'use strict';

describe('User Profile', function() {

	/*
	*	 Reference: How to trigger browser events in Angular scenario runner:
	*  http://stackoverflow.com/questions/16804924/how-to-trigger-enter-in-an-input-in-angular-scenario-test
	*
	*	 Required because UI will auto-update modified fields on blur event. However, simply using
	*	 Angular scenario input(selector).enter(value) does not trigger the blur event.
	*/
	var modifyField = function(ngModel, dataValue, selectorId) {
		input(ngModel).enter(dataValue);
		element(selectorId).query(function($el, done) {
			var event = new CustomEvent('blur');
			event.keyCode = 9; //http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
			$el.val(2);
			$el.get(0).dispatchEvent(event);
			done();
		});
	};

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	it('Logged in user can modify their private profile', function() {
		var marioUser = testUsers.getMarioUserName;
		var marioPswd = testUsers.getMarioUserPassword;
		var originalFirstName = testUsers.getMarioFirstName;
		var originalLastName = testUsers.getMarioLastName;

		var modifiedFirstName = 'SuperMario';
		var modifiedLastName = 'RossiBrothers';

		// Login
		browser().navigateTo('/login');
		input('username').enter(marioUser);
		input('password').enter(marioPswd);
		element('#loginButton').click();
		sleep(2);

		// Navigate to My Profile
		element('#myProfileLink').click();
		sleep(1);
		expect(browser().location().url()).toBe('/useredit');

		// Verify existing user profile data
		expect(input('userProfile.name').val()).toEqual(originalFirstName);
		expect(input('userProfile.last_name').val()).toEqual(originalLastName);
		expect(input('userProfile.email').val()).toEqual(marioUser);
		expect(input('userProfile.workplace').val()).toEqual('Scuola A');
		expect(input('userProfile.city').val()).toEqual('Roma');
		expect(input('userProfile.country').val()).toEqual('Italia');

		// Modify profile data
		modifyField('userProfile.name', modifiedFirstName, '#userProfileFirstName');
		modifyField('userProfile.last_name', modifiedLastName, '#userProfileLastName');
		
		// Verify profile changes were saved
		browser().reload();
		sleep(1);
		expect(browser().location().url()).toBe('/useredit');
		expect(input('userProfile.name').val()).toEqual(modifiedFirstName);
		expect(input('userProfile.last_name').val()).toEqual(modifiedLastName);

		// Put things back the way they were and verify
		modifyField('userProfile.name', originalFirstName, '#userProfileFirstName');
		modifyField('userProfile.last_name', originalLastName, '#userProfileLastName');
		browser().reload();
		sleep(1);
		expect(browser().location().url()).toBe('/useredit');
		expect(input('userProfile.name').val()).toEqual(originalFirstName);
		expect(input('userProfile.last_name').val()).toEqual(originalLastName);

		// Logout
		element('#userActionsMenu').click();
		element('#logoutLink').click();
	});

	it('Anonymous user cannot navigate to private profile page', function() {
		browser().navigateTo('/useredit');
		sleep(1);
		expect(browser().location().url()).toBe('/login');
	});

});