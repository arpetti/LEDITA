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
	    input('password').enter('12345678');
	    input('retypepassword').enter('12345678');
	    input('terms').check();
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

	// TODO: Verify all the client side validation errors or that submit button is disabled when form error
	it('Password cannot be less than 8 characters', function() {
		var userNameToRegister = userNameGenerator.buildUserName + 'a';

		// Try to register
		browser().navigateTo('/login');
	    input('firstname').enter('John');
	    input('surname').enter('Smith');
	    input('username').enter(userNameToRegister);
	    input('password').enter('1234567');
	    input('retypepassword').enter('1234567');
	    input('terms').check();
	    element('#signup').click();

	    // Verify error message is displayed
	    expect(element('.errorTip').text()).toMatch('Your password is required to be at least 8 characters');

	    // Provide a longer password
	    input('password').enter('12345678');
	    input('retypepassword').enter('12345678');
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
		var existingUserName = testUsers.getOldUserName;

		// Try to register
		browser().navigateTo('/login');
	    input('firstname').enter('John');
	    input('surname').enter('Smith');
	    input('username').enter(existingUserName);
	    input('password').enter('12345678');
	    input('retypepassword').enter('12345678');
	    input('terms').check();
	    element('#signup').click();

	    // Verify error message is displayed
	    expect(element('#registrationErrors', 'Registration error is displayed').count()).toBe(1);
	    expect(element('#registrationErrors').text()).toMatch('User already exists');

	});

}); 	