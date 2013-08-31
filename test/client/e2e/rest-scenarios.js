'use strict';


describe('REST resources require authorization', function() {

  it('GET learning designs', function() {
    browser().navigateTo('/learningdesigns');
    expect(element('pre').text()).toBe('Unauthorized');
  });

  it('GET learning design by id', function() {
    browser().navigateTo('/learningdesigns/1');
    expect(element('pre').text()).toBe('Unauthorized');
  });

  it('GET learning design structure by id', function() {
    browser().navigateTo('/learningdesignstructure/1');
    expect(element('pre').text()).toBe('Unauthorized');
  });

}); 