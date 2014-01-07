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

	it('User can view their own public and private projects', function() {

		// Login Sara
		browser().navigateTo('/login');
		input('username').enter(testUsers.getUserName);
		input('password').enter(testUsers.getUserPassword);
		element('#loginButton').click();
		sleep(2);

		// Navigate to My Projects
		element('#myProjectsLink').click();
		sleep(1);
		expect(browser().location().url()).toBe('/userlds');

		// Verify Sara's projects are displayed (default sort is by descending date)
		expect(repeater('.my-projects').count()).toBe(9);
    expect(repeater('.my-projects').row(0)).toEqual(['Learning Design Title Demo 5','A1 A2 B1 B2 C1 C2','Semester','1','12-8-2012']);
    expect(repeater('.my-projects').row(1)).toEqual(['Learning Design Title Demo 6','C2','Module','0','11-8-2012']);
    expect(repeater('.my-projects').row(2)).toEqual(['Learning Design Title Demo 13','B1','Semester','1','16-5-2012']);
    expect(repeater('.my-projects').row(3)).toEqual(['Learning Design Title Demo 14','A2','Module','0','16-4-2012']);
    expect(repeater('.my-projects').row(4)).toEqual(['Learning Design Title Demo 15','C2','Lesson','1','16-3-2012']);
    expect(repeater('.my-projects').row(5)).toEqual(['Learning Design Title Demo 21','B1','Semester','1','12-1-2012']);
    expect(repeater('.my-projects').row(6)).toEqual(['Learning Design Title Demo 22','B1','Module','0','11-1-2012']);
    expect(repeater('.my-projects').row(7)).toEqual(['Learning Design Title Demo 23','B2','Lesson','1','10-1-2012']);
    expect(repeater('.my-projects').row(8)).toEqual(['Learning Design Title Demo 29','C1','Semester','1','4-1-2012']);

    // Verify sort by ascending date (have to click on it twice to sort)
    element('#sortMyProjectsByCreationDate').click();
    sleep(0.1);
    element('#sortMyProjectsByCreationDate').click();
    sleep(0.1);

    expect(repeater('.my-projects').count()).toBe(9);
    expect(repeater('.my-projects').row(0)).toEqual(['Learning Design Title Demo 29','C1','Semester','1','4-1-2012']);
    expect(repeater('.my-projects').row(1)).toEqual(['Learning Design Title Demo 23','B2','Lesson','1','10-1-2012']);
    expect(repeater('.my-projects').row(2)).toEqual(['Learning Design Title Demo 22','B1','Module','0','11-1-2012']);
    expect(repeater('.my-projects').row(3)).toEqual(['Learning Design Title Demo 21','B1','Semester','1','12-1-2012']);
    expect(repeater('.my-projects').row(4)).toEqual(['Learning Design Title Demo 15','C2','Lesson','1','16-3-2012']);
    expect(repeater('.my-projects').row(5)).toEqual(['Learning Design Title Demo 14','A2','Module','0','16-4-2012']);
    expect(repeater('.my-projects').row(6)).toEqual(['Learning Design Title Demo 13','B1','Semester','1','16-5-2012']);
    expect(repeater('.my-projects').row(7)).toEqual(['Learning Design Title Demo 6','C2','Module','0','11-8-2012']);
		expect(repeater('.my-projects').row(8)).toEqual(['Learning Design Title Demo 5','A1 A2 B1 B2 C1 C2','Semester','1','12-8-2012']);

		// Logout
    element('#userActionsMenu').click();
    element('#logoutLink').click();
	});

});