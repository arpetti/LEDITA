var chai = require('chai');
var expect = require('chai').expect;
var messages = require('../../../server/validate/ValidationMessages');
var dao = require('../../../server/dao/Dao');
var fixture = require('../../../server/service/StudentsService');

describe('Students Service Integration', function() {

	var cleanupQuery = 'delete from students where id = ?';
	
	it('Inserts a Students record for group type', function(done) {
		var studentsType = '4';
		var groupNumber = 2;
		var peoplePerGroup = 3;
		fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, function(err, studentsId, message) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			expect(studentsId).not.to.be.null;
			expect(studentsId).to.be.above(0);
			dao.deleteRecord(cleanupQuery, [studentsId], function(err, result) {
				expect(err).to.be.null;
				done();
			});
		});
	});

	it('Inserts a Students record for group type partially populated', function(done) {
		var studentsType = '4';
		var groupNumber = null;
		var peoplePerGroup = 3;
		fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, function(err, studentsId, message) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			expect(studentsId).not.to.be.null;
			expect(studentsId).to.be.above(0);
			dao.deleteRecord(cleanupQuery, [studentsId], function(err, result) {
				expect(err).to.be.null;
				done();
			});
		});
	});

	it('Inserts a Students record for non group type', function(done) {
		var studentsType = '2';
		var groupNumber = null;
		var peoplePerGroup = null;
		fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, function(err, studentsId, message) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			expect(studentsId).not.to.be.null;
			expect(studentsId).to.be.above(0);
			dao.deleteRecord(cleanupQuery, [studentsId], function(err, result) {
				expect(err).to.be.null;
				done();
			});
		});
	});

	it('Calls back with error message if studentsType does not exist', function(done) {
		var studentsType = '999';
		var groupNumber = null;
		var peoplePerGroup = null;
		fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, function(err, studentsId, message) {
			expect(err).not.to.be.null;
			expect(studentsId).to.be.null;
			expect(message).to.equal(messages.ACTIVITY_STUDENTS_TYPE_INVALID);
			done();
		});
	});

});