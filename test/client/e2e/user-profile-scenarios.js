'use strict';

describe('User Profile', function() {

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

	it('Anonymous user cannot navigate to private profile page', function() {
		browser().navigateTo('/useredit');
		sleep(1);
		expect(browser().location().url()).toBe('/login');
	});

	it('Client side validation displays messages on invalid input', function() {
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

		// Verify first name
		verifyField('userProfile.name', '', 'John', '#firstNameReqErr', 'Necessario');
		verifyField('userProfile.name', 'John123', 'John', '#firstNamePatternErr', 'Simbolo non permesso');
		verifyField('userProfile.name', 'J', 'John', '#firstNameMinErr', 'Minimo 2 caratteri');
		verifyField('userProfile.name', testUsers.buildLongFirstName, 'John', '#firstNameMaxErr', 'Massimo 20 caratteri');

		// Verify last name
		verifyField('userProfile.last_name', '', 'Smith', '#lastNameReqErr', 'Necessario');
		verifyField('userProfile.last_name', 'Smith123', 'Smith', '#lastNamePatternErr', 'Simbolo non permesso');
		verifyField('userProfile.last_name', 'S', 'Smith', '#lastNameMinErr', 'Minimo 2 caratteri');
		verifyField('userProfile.last_name', testUsers.buildLongFirstName, 'Smith', '#lastNameMaxErr', 'Massimo 20 caratteri');

		// Verify email
		verifyField('userProfile.email', '', 'john.smith@test.com', '#emailReqErr', 'Necessario');
		verifyField('userProfile.email', 'johnsmithattestdotcom', 'john.smith@test.com', '#emailPatternErr', 'Per favore, inserisci un email valido');
		verifyField('userProfile.email', testUsers.buildLongEmailAddress, 'john.smith@test.com', '#emailMaxErr', 'Massimo 255 caratteri');

		// Verify workplace
		verifyField('userProfile.workplace', '** University **', 'University', '#workplacePatternErr', 'Simbolo non permesso');
		verifyField('userProfile.workplace', testUsers.buildLongLdName, 'University', '#workplaceMaxErr', 'Massimo 50 caratteri');// Verify workplace

		// Verify city
		verifyField('userProfile.city', '** Florence **', 'Florence', '#cityPatternErr', 'Simbolo non permesso');
		verifyField('userProfile.city', testUsers.buildLongLdName, 'Florence', '#cityMaxErr', 'Massimo 50 caratteri');

		// Verify country
		verifyField('userProfile.country', '** Canada **', 'Canada', '#countryPatternErr', 'Simbolo non permesso');
		verifyField('userProfile.country', testUsers.buildLongLdName, 'Canada', '#countryMaxErr', 'Massimo 50 caratteri');

		// Logout
		element('#userActionsMenu').click();
		element('#logoutLink').click();
	});

});