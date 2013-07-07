'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Registration', function() {

	it('New user can register', function() {
		var userNameToRegister = userNameGenerator.buildUserName;

    	// Register
		browser().navigateTo('/login');
	    input('firstname').enter('John');
	    input('surname').enter('Smith');
	    input('username').enter(userNameToRegister);
	    input('password').enter('123456');
	    input('retypepassword').enter('123456');
	    element('#signup').click();

	    // Verify logged in view
	    expect(element('#navBarUser', 'user nav is displayed for logged in user').css('display')).toBe('block');
	    expect(element('#navBarAnon', 'anon nav is hidden for logged in user').css('display')).toBe('none');
	    expect(element('#loggedInUserName', 'user name is displayed for logged in user').text()).toBe(userNameToRegister);

	    // Logout
	    element('#userActionsMenu').click();
	    element('#logoutLink').click();

	    // Verify anon view
	    expect(element('#navBarAnon', 'anon nav is displayed after user logs out').css('display')).toBe('block');
	    expect(element('#navBarUser', 'user nav is hidden after user logs out').css('display')).toBe('none');
	});

	it('Password cannot be less than 5 characters', function() {
		var userNameToRegister = userNameGenerator.buildUserName + 'a';

		// Try to register
		browser().navigateTo('/login');
	    input('firstname').enter('John');
	    input('surname').enter('Smith');
	    input('username').enter(userNameToRegister);
	    input('password').enter('abc');
	    input('retypepassword').enter('abc');
	    element('#signup').click();

	    // Verify error message is displayed
	    expect(element('#registrationErrors', 'Registration error is displayed').count()).toBe(1);
	    expect(element('#registrationErrors').text()).toMatch('Password must be 5-60 characters long');

	    // Provide a longer password
	    input('password').enter('abcde');
	    input('retypepassword').enter('abcde');
	    element('#signup').click();

	    // Verify logged in view
	    expect(element('#navBarUser', 'user nav is displayed for logged in user').css('display')).toBe('block');
	    expect(element('#navBarAnon', 'anon nav is hidden for logged in user').css('display')).toBe('none');
	    expect(element('#loggedInUserName', 'user name is displayed for logged in user').text()).toBe(userNameToRegister);

	    // Logout
	    element('#userActionsMenu').click();
	    element('#logoutLink').click();

	    // Verify anon view
	    expect(element('#navBarAnon', 'anon nav is displayed after user logs out').css('display')).toBe('block');
	    expect(element('#navBarUser', 'user nav is hidden after user logs out').css('display')).toBe('none');
	});

	it('Cannot register a user that already exists', function() {
		var existingUserName = testUsers.getUserName;

		// Try to register
		browser().navigateTo('/login');
	    input('firstname').enter('John');
	    input('surname').enter('Smith');
	    input('username').enter(existingUserName);
	    input('password').enter('12345');
	    input('retypepassword').enter('12345');
	    element('#signup').click();

	    // Verify error message is displayed
	    expect(element('#registrationErrors', 'Registration error is displayed').count()).toBe(1);
	    expect(element('#registrationErrors').text()).toMatch('User already exists');

	});

}); 	