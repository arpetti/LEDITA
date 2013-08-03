'use strict';

/* Verify REST resources require authorization */

describe('REST resources', function() {

  it('GET users', function() {
    browser().navigateTo('/users');
    expect(element('pre').text()).toBe('Unauthorized');
  });

  it('GET learning designs', function() {
    browser().navigateTo('/learningdesigns');
    expect(element('pre').text()).toBe('Unauthorized');
  });

  it('GET learning design by id', function() {
    browser().navigateTo('/learningdesigns/1');
    expect(element('pre').text()).toBe('Unauthorized');
  });

}); 