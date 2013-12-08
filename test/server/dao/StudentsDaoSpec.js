var chai = require('chai');
var expect = require('chai').expect;
var fixture = require('../../../server/dao/StudentsDao');

describe('Students DAO', function() {

	describe('Find Students Type', function() {

		it('Finds Students Type records by type', function(done) {
			var type = '1';
			var expectedDescription = 'Classe';
			fixture.findStudentsType(type, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(1);
				expect(results[0].type).to.equal(type);
				expect(results[0].description).to.equal(expectedDescription);
				done();
			});
		});

		it('Returns zero results for non existing type', function(done) {
			var type = '999';
			fixture.findStudentsType(type, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(0);
				done();
			});
		})

	});
	

});