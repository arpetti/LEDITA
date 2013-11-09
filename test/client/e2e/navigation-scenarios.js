describe('Navigation', function() {

	afterEach(function() {
		browser().navigateTo('/logout');
	});

	it('Default page', function() {
    	browser().navigateTo('/');
    	// This remains commented until have a fix - https://github.com/angular/angular.js/issues/3149
    	// expect(browser().location().url()).toBe('/');
  	});

  	it('Login page', function() {
	    browser().navigateTo('/login');
	    expect(browser().location().url()).toBe('/login');
  	});

  	it('Invalid path redirects to 404', function() {
    	browser().navigateTo('/showAllUsers');
    	expect(browser().location().url()).toBe('/404');
  	});

});