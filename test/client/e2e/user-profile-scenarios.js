'use strict';

/*
*		Reference: How to trigger jquery events in Angular scenario runner:
*  	http://stackoverflow.com/questions/16804924/how-to-trigger-enter-in-an-input-in-angular-scenario-test
*
*		This is required because UI will auto-update modified fields on blur event. However, simply using
*		Angular scenario input(selector).enter(value) does not trigger the blur event.
*/
angular.scenario.dsl('appElement', function() {
	return function(selector, fn) {
    return this.addFutureAction('element ' + selector, function($window, $document, done) {
      fn.call(this, $window.angular.element(selector));
      done();
    });
  };
});

describe('User Profile', function() {

	var modifyField = function(ngModel, dataValue, selectorId) {
		input(ngModel).enter(dataValue);
		appElement(selectorId, function(elm) {
  		elm.trigger('blur');
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