var chai = require('chai');
var expect = require('chai').expect

var fixture = require('../../../server/dao/ActivityCreateDao');
var dao = require('../../../server/dao/Dao');

describe('Activity Create DAO', function() {

	describe('Students', function() {

		var insertedStudentsId = null;
		var cleanupStudents = 'DELETE FROM students WHERE id = ?';

		afterEach(function(done) {
			if (insertedStudentsId) {
		        dao.deleteRecord(cleanupStudents, [insertedStudentsId], function(err, result) {
		        	insertedStudentsId = null;
		            done();
		        });
			} else {
				done();
			}
	    });

		it('Inserts Students - GROUP type: returns inserted students id', function(done) {
			var data = {
				type: 4,
				group_number: 5,
				people_per_group: 4
			};
			fixture.insertStudents(data, function(err, studentsId) {
				expect(err).to.be.null;
				expect(studentsId).not.to.be.null;
				expect(studentsId).to.be.above(0);
				insertedStudentsId = studentsId;
				done();
			});
		});

		it('Inserts Students - PAIR type: returns inserted students id', function(done) {
			var data = {
				type: 3
			};
			fixture.insertStudents(data, function(err, studentsId) {
				expect(err).to.be.null;
				expect(studentsId).not.to.be.null;
				expect(studentsId).to.be.above(0);
				insertedStudentsId = studentsId;
				done();
			});
		});

		it('Inserts Students - INVALID type: calls back with error FK violation', function(done) {
			var data = {
				type: 999
			};
			fixture.insertStudents(data, function(err, studentsId) {
				expect(err).not.to.be.null;
				expect(err.message).to.contain('fk_students_type');
				expect(studentsId).to.be.undefined;
				done();
			});
		});

	});

});