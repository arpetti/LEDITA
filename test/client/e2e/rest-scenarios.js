'use strict';


describe('REST resources require authorization', function() {

	describe('Learning Design', function() {

		it('GET learning designs', function() {
			browser().navigateTo('/learningdesigns');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET learning design by id', function() {
			browser().navigateTo('/learningdesigns/1');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET learning design by id for edit', function() {
			browser().navigateTo('/learningdesign/1');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET learning design structure by id', function() {
			browser().navigateTo('/learningdesignstructure/1');
			expect(element('pre').text()).toBe('Unauthorized');
		});

	});

	describe('User Information', function() {

		it('GET user profiles', function() {
			browser().navigateTo('/userprofiles');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET user profile by id', function() {
			browser().navigateTo('/userprofiles/1');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET unique users', function() {
			browser().navigateTo('/uniqueusers');
			expect(element('pre').text()).toBe('Unauthorized');
		});

	});

	describe('Reference Data', function() {

		it('GET qcers', function() {
			browser().navigateTo('/reference/qcer');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET scopes matching', function() {
			browser().navigateTo('/reference/scopes/Le');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET topics matching', function() {
			browser().navigateTo('/reference/subjects/To');
			expect(element('pre').text()).toBe('Unauthorized');
		});

		it('GET objectives matching', function() {
			browser().navigateTo('/reference/objectives/Obj');
			expect(element('pre').text()).toBe('Unauthorized');
		});

	});

}); 