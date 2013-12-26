'use strict';

describe('User Profile', function() {

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	it('Logged in user can navigate to their private profile page', function() {
		var marioUser = testUsers.getMarioUserName;
		var marioPswd = testUsers.getMarioUserPassword;

		// Login
		browser().navigateTo('/login');
		input('username').enter(marioUser);
		input('password').enter(marioPswd);
		element('#loginButton').click();
		sleep(2);

		// My Profile
		element('#myProfileLink').click();
		sleep(1);
		expect(browser().location().url()).toBe('/useredit');
		expect(input('userProfile.name').val()).toEqual('Mario');
		expect(input('userProfile.last_name').val()).toEqual('Rossi');
		expect(input('userProfile.email').val()).toEqual(marioUser);
		expect(input('userProfile.workplace').val()).toEqual('Scuola A');
		expect(input('userProfile.city').val()).toEqual('Roma');
		expect(input('userProfile.country').val()).toEqual('Italia');

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