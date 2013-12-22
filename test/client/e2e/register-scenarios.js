'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Registration', function() {

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	it('New user can register', function() {
		var userNameToRegister = 'john.smith@test.com';
		var expectedUserDisplayName = 'John Smith';

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
	    expect(element('#loggedInUserName', 'user name is displayed for logged in user').text()).toBe(expectedUserDisplayName);

	    // Logout
	    element('#userActionsMenu').click();
	    element('#logoutLink').click();

	    // Verify anon view
	    expect(element('#navBarAnon', 'anon nav is displayed after user logs out').css('display')).toBe('block');
	    expect(element('#navBarUser', 'user nav is hidden after user logs out').css('display')).toBe('none');
	});

	describe('Client side validation', function() {

		var verify = function(field, invalidInput, validInput, fieldErrorId, expectedErrorMessage) {
			input(field).enter(invalidInput);
		    sleep(0.3);
		    expect(element('#signup').attr('disabled')).toBe("disabled");
		    expect(element(fieldErrorId).css('display')).toBe("inline");
		    expect(element(fieldErrorId).text()).toMatch(expectedErrorMessage);
		    input(field).enter(validInput);
		    sleep(0.3);
		    expect(element(fieldErrorId).css('display')).toBe("none");
		}

		it('Invalid input is not allowed', function() {
			browser().navigateTo('/login');
			verify('firstname', 'John123', 'John', '#firstNameLetters', 'Il tuo nome può contenere solo lettere');
			verify('surname', 'Smith*&^%', 'Smith', '#surnameLetters', 'Il tuo cognome può contenere solo lettere');
			verify('username', 'john.smith.email.com', 'john.smith@email.com', '#emailFormat', 'Per favore, inserisci un email valido');
			verify('password', '1234567', '12345678', '#passwordMinLength', 'Minimo 8 caratteri');
		});

		it('Password and Retype Password must match', function() {
			browser().navigateTo('/login');
			input('password').enter('12345678');
			input('retypepassword').enter('12345677');
			sleep(0.3);
			expect(element('#passwordNotMatch').css('display')).toBe("inline");
			expect(element('#passwordNotMatch').text()).toMatch('Le Passwords non coincidono');
			input('retypepassword').enter('12345678');
			sleep(0.3);
			expect(element('#passwordNotMatch').css('display')).toBe("none");
		});

		it('Must accept terms and conditions', function() {
			browser().navigateTo('/login');
			input('firstname').enter('John');
			input('surname').enter('Smith');
			input('username').enter('john.smith@email.com');
			input('password').enter('12345678');
			input('retypepassword').enter('12345678');
			sleep(0.3);
			expect(element('#signup').attr('disabled')).toBe("disabled");
			input('terms').check();
			sleep(0.3);
			expect(element('#signup').attr('disabled')).toBe(undefined);
		});

	});

	describe('Server side validation', function() {

		afterEach(function() {
			browser().navigateTo('/logout');
		});

		it('Cannot register a user that already exists', function() {
			var existingUserName = testUsers.getUserName;

			browser().navigateTo('/login');
			expect(element('#registrationErrors').css('display')).toBe("none");

		    input('firstname').enter('John');
		    input('surname').enter('Smith');
		    input('username').enter(existingUserName);
		    input('password').enter('12345678');
		    input('retypepassword').enter('12345678');
		    input('terms').check();
		    element('#signup').click();
		    sleep(2);
		    expect(element('#registrationErrors').css('display')).toBe("block");
		    expect(element('#registrationErrors').text()).toMatch('Questo indirizzo email è già registrato.');

		});

		it('Email cannot be too long', function() {

			browser().navigateTo('/login');
			expect(element('#registrationErrors').css('display')).toBe("none");

		    input('firstname').enter('Tweety');
		    input('surname').enter('Bird');
		    input('username').enter(testUsers.buildLongEmailAddress);
		    input('password').enter('12345678');
		    input('retypepassword').enter('12345678');
		    input('terms').check();
		    element('#signup').click();
		    sleep(2);
		    expect(element('#registrationErrors').css('display')).toBe("block");
		    expect(element('#registrationErrors').text()).toMatch('L\'indirizzo email deve essere lungo meno di 255 caratteri.');

		});

	});

}); 	