'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Login Flow', function() {

  // FIXME: Angular-Karma-Scenario bug? Doesn't work for navigating to slash
  it('Non logged in user sees login or register page', function() {
    browser().navigateTo('/');
    expect(browser().location().url()).toBe('/');
  });

  it('Non logged in user can navigate to login page', function() {
    browser().navigateTo('/login');
    pause();
    expect(browser().location().url()).toBe('/login');
  });

}); 