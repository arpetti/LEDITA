'use strict';

describe('User Profile', function() {

	/*
	*	 Reference: How to trigger browser events in Angular scenario runner:
	*  http://stackoverflow.com/questions/16804924/how-to-trigger-enter-in-an-input-in-angular-scenario-test
	*
	*	 Required because UI will auto-update modified fields on blur event. However, simply using
	*	 Angular scenario input(selector).enter(value) does not trigger the blur event.
	*
	*  Unfortunately, this does NOT work with PhantomJS, even with polyfill:
	*		https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
	*  Therefore, this test is excluded from Travis CI (see .travis.yml)
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

	var verifyField = function(field, invalidInput, validInput, fieldErrorId, expectedErrorMessage) {
		input(field).enter(invalidInput);
    sleep(0.3);
    expect(element(fieldErrorId).css('display')).toBe("inline");
    expect(element(fieldErrorId).text()).toMatch(expectedErrorMessage);
    input(field).enter(validInput);
    sleep(0.3);
    expect(element(fieldErrorId).css('display')).toBe("none");
	};

	var marioUser = testUsers.getMarioUserName;
	var marioPswd = testUsers.getMarioUserPassword;

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	it('Logged in user can modify their private profile', function() {
		var originalFirstName = testUsers.getMarioFirstName;
		var originalLastName = testUsers.getMarioLastName;
		var originalWorkplace = 'Scuola A';
		var originalCity = 'Roma';
		var originalCountry = 'Italia';

		var modifiedFirstName = 'SuperMario';
		var modifiedLastName = 'RossiBrothers';
		var modifiedEmail = 'super.hero@test.edu';
		var modifiedWorkplace = 'Mushroom Factory';
		var modifiedCity = 'Mushroomville';
		var modifiedCountry = 'Mushroom';

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
		expect(input('userProfile.workplace').val()).toEqual(originalWorkplace);
		expect(input('userProfile.city').val()).toEqual(originalCity);
		expect(input('userProfile.country').val()).toEqual(originalCountry);

		// Modify profile data
		modifyField('userProfile.name', modifiedFirstName, '#userProfileFirstName');
		modifyField('userProfile.last_name', modifiedLastName, '#userProfileLastName');
		modifyField('userProfile.email', modifiedEmail, '#userProfileEmail');
		modifyField('userProfile.workplace', modifiedWorkplace, '#userProfileWorkplace');
		modifyField('userProfile.city', modifiedCity, '#userProfileCity');
		modifyField('userProfile.country', modifiedCountry, '#userProfileCountry');
		
		// Verify profile changes were saved
		browser().reload();
		sleep(1);
		expect(browser().location().url()).toBe('/useredit');
		expect(input('userProfile.name').val()).toEqual(modifiedFirstName);
		expect(input('userProfile.last_name').val()).toEqual(modifiedLastName);
		expect(input('userProfile.email').val()).toEqual(modifiedEmail);
		expect(input('userProfile.workplace').val()).toEqual(modifiedWorkplace);
		expect(input('userProfile.city').val()).toEqual(modifiedCity);
		expect(input('userProfile.country').val()).toEqual(modifiedCountry);

		// Put things back the way they were and verify
		modifyField('userProfile.name', originalFirstName, '#userProfileFirstName');
		modifyField('userProfile.last_name', originalLastName, '#userProfileLastName');
		modifyField('userProfile.email', marioUser, '#userProfileEmail');
		modifyField('userProfile.workplace', originalWorkplace, '#userProfileWorkplace');
		modifyField('userProfile.city', originalCity, '#userProfileCity');
		modifyField('userProfile.country', originalCountry, '#userProfileCountry');
		browser().reload();
		sleep(1);
		expect(browser().location().url()).toBe('/useredit');
		expect(input('userProfile.name').val()).toEqual(originalFirstName);
		expect(input('userProfile.last_name').val()).toEqual(originalLastName);
		expect(input('userProfile.email').val()).toEqual(marioUser);
		expect(input('userProfile.workplace').val()).toEqual(originalWorkplace);
		expect(input('userProfile.city').val()).toEqual(originalCity);
		expect(input('userProfile.country').val()).toEqual(originalCountry);

		// Logout
		element('#userActionsMenu').click();
		element('#logoutLink').click();
	});

});