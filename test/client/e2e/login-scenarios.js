'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Login Flow', function() {

	afterEach(function() {
		browser().navigateTo('/logout');
	});

    it('Non logged in user sees anon view on login page', function() {
        browser().navigateTo('/login');
        sleep(3);
        expect(browser().location().url()).toBe('/login');
        expect(element('#navBarAnon', 'anon nav is displayed for anon user').css('display')).toBe('block');
        expect(element('#navBarUser', 'user nav is hidden for anon user').css('display')).toBe('none');
    });

    it('Existing user can login', function() {
        var existingUserName = testUsers.getUserName;
        var existingUserPassword = testUsers.getUserPassword;

        browser().navigateTo('/login');
        expect(browser().location().url()).toBe('/login');
        input('username').enter(existingUserName);
        input('password').enter(existingUserPassword);
        element('#loginButton').click();

        // Verify logged in view
        expect(element('#navBarUser', 'user nav is displayed for logged in user').css('display')).toBe('block');
        expect(element('#navBarAnon', 'anon nav is hidden for logged in user').css('display')).toBe('none');
        expect(element('#loggedInUserName', 'user name is displayed for logged in user').text()).toBe(existingUserName);

        // Logout
        element('#userActionsMenu').click();
        element('#logoutLink').click();

        // Verify anon view
        expect(element('#navBarAnon', 'anon nav is displayed after user logs out').css('display')).toBe('block');
        expect(element('#navBarUser', 'user nav is hidden after user logs out').css('display')).toBe('none');

    });

    it('User cannot log in with invalid password', function() {
        var userName = testUsers.getUserName;
        var invalidPassword = "garbage";

        browser().navigateTo('/login');
        input('username').enter(userName);
        input('password').enter(invalidPassword);
        element('#loginButton').click();

        // Verify login error
        expect(element('#loginError', 'Login error is displayed').count()).toBe(1);
        expect(element('#loginError').text()).toMatch('Email o password invalidi');

        // Verify user is still in anon view
        expect(element('#navBarAnon', 'anon nav is displayed after user fails to log in').css('display')).toBe('block');
        expect(element('#navBarUser', 'user nav is hidden after user fails to log in').css('display')).toBe('none');

    });

}); 