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

	// TODO: Nest a describe and have individual tests to verify each client side validation rule
	it('Client side validation rules', function() {
		var userNameToRegister = userNameGenerator.buildUserName + 'a';

		browser().navigateTo('/login');
	    
	    // First Name
	    input('firstname').enter('John123');
	    sleep(1);
	    expect(element('#firstNameLetters').css('display')).toBe("inline");
	    expect(element('#firstNameLetters').text()).toMatch('Your name can contain only letters');
	    input('firstname').enter('John');
	    sleep(1);
	    expect(element('#firstNameLetters').css('display')).toBe("none");
	    
	    // Surname
	    input('surname').enter('Smith');
	    
	    // Email (a.k.a. username)
	    input('username').enter(userNameToRegister);
	    
	    // Password
	    input('password').enter('1234567');
	    sleep(1);
	    expect(element('#passwordMinLength').css('display')).toBe("inline");
	    expect(element('#passwordMinLength').text()).toMatch('Your password is required to be at least 8 characters');
	    input('password').enter('12345678');
	    sleep(1);
	    expect(element('#passwordMinLength').css('display')).toBe("none");
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