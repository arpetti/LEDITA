var chai = require('chai');
var expect = require('chai').expect;
var fixture = require('../../../server/dao/StudentsDao');
var dao = require('../../../server/dao/Dao');

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

	describe('Insert Students', function() {

		var cleanupQuery = 'delete from students where id = ?';

		it('Inserts a new Students record', function(done) {
			var studentsObj = { type: '2' };
			fixture.insertStudents(studentsObj, function(err, insertId) {
				expect(err).to.be.null;
				expect(insertId).not.to.be.null;
				expect(insertId).to.be.above(0);
				dao.deleteRecord(cleanupQuery, [insertId], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			});
		});

		it('Inserts a new Student record with group details', function(done) {
			var studentsObj = {
				type: '4',
				group_number: 2,
				people_per_group: 6
			};
			fixture.insertStudents(studentsObj, function(err, insertId) {
				expect(err).to.be.null;
				expect(insertId).not.to.be.null;
				expect(insertId).to.be.above(0);
				dao.deleteRecord(cleanupQuery, [insertId], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			});
		});

		it('Calls back with error for non existing type', function(done) {
			var studentsObj = { type: '999' };
			fixture.insertStudents(studentsObj, function(err, insertId) {
				expect(err).not.to.be.null;
				expect(err.message).to.contain('fk_students_type');
				expect(insertId).to.be.undefined;
				done();
			});
		});

	});

});