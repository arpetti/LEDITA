'use strict';

describe('User Projects', function() {

	var marioUser = testUsers.getMarioUserName;
	var marioPswd = testUsers.getMarioUserPassword;

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	it('User can view another users public projects', function() {

		var userIdLucia = 2;

		// Login
		browser().navigateTo('/login');
		input('username').enter(marioUser);
		input('password').enter(marioPswd);
		element('#loginButton').click();
		sleep(2);

		// Select author from second LD
		element('#ldlist .ld-item:nth-child(2) .authorName a').click();
		sleep(1);
		expect(browser().location().url()).toBe('/user/' + userIdLucia);

		// Verify profile image is displayed and default is hidden
		expect(element('#userProfileImage').attr('src')).toMatch('avatar/user' + userIdLucia + '.png');
		expect(element('#userProfileImage').css('display')).toBe("inline");
		expect(element('#userProfileDefaultImage').css('display')).toBe("none");

		// Verify user profile information
		expect(binding('userInfo.name')).toBe('Lucia');
		expect(binding('userInfo.last_name')).toBe('Bianchi');
		expect(binding('userInfo.workplace')).toBe('Scuola B');
		expect(binding('userInfo.city')).toBe('Parigi');
		expect(binding('userInfo.country')).toBe('Francia');

		// Verify Lucia's projects are displayed (default sort is by descending date)
		expect(repeater('.user-projects').count()).toBe(4);
    expect(repeater('.user-projects').row(0)).toEqual(['Learning Design Title Demo 3','C1','Semester','14-8-2012']);
    expect(repeater('.user-projects').row(1)).toEqual(['Learning Design Title Demo 11','A2','Semester','16-7-2012']);
    expect(repeater('.user-projects').row(2)).toEqual(['Learning Design Title Demo 19','A2','Semester','14-1-2012']);
    expect(repeater('.user-projects').row(3)).toEqual(['Learning Design Title Demo 27','B2','Semester','6-1-2012']);

    // Verify sort by ascending date (have to click on it twice to sort)
    element('#sortUserProjectsByCreationDate').click();
    sleep(0.1);
    element('#sortUserProjectsByCreationDate').click();
    sleep(0.1);
    expect(repeater('.user-projects').count()).toBe(4);
    expect(repeater('.user-projects').row(0)).toEqual(['Learning Design Title Demo 27','B2','Semester','6-1-2012']);
    expect(repeater('.user-projects').row(1)).toEqual(['Learning Design Title Demo 19','A2','Semester','14-1-2012']);
    expect(repeater('.user-projects').row(2)).toEqual(['Learning Design Title Demo 11','A2','Semester','16-7-2012']);
    expect(repeater('.user-projects').row(3)).toEqual(['Learning Design Title Demo 3','C1','Semester','14-8-2012']);

		// Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();
	});

});