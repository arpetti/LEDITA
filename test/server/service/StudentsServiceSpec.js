var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var studentsDao = require('../../../server/dao/StudentsDao');
var messages = require('../../../server/validate/ValidationMessages');
var fixture = require('../../../server/service/StudentsService');

describe('Students Service', function() {

	var sandbox = sinon.sandbox.create();
	var studentsType;
	var groupNumber;
	var peoplePerGroup;

  beforeEach(function() {
  	studentsType = '1';
		groupNumber = 3;
		peoplePerGroup = 4;
  });

  afterEach(function() {
      sandbox.restore();
  });
	
	it('Calls back with error message if finding students type encounters error', function(done) {
		var daoFindError = new Error('something went wrong with find');
		var daoFindStub = sandbox.stub(studentsDao, 'findStudentsType', function(type, cb) {
			cb(daoFindError);
		});

		var daoInsertStub = sandbox.stub(studentsDao, 'insertStudents');

		var serviceCb = function(err, studentsId, message) {
			expect(err).not.to.be.null;
			expect(studentsId).to.be.null;
			expect(message).to.equal(messages.ACTIVITY_STUDENTS_TYPE_FIND_ERROR);
			assert.isTrue(daoFindStub.withArgs(studentsType).calledOnce);
			assert.equal(daoInsertStub.callCount, 0);
			done();
		};
		fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, serviceCb);
	});

	it('Calls back with error message if zero results returned from finding students type', function(done) {
		var daoFindResults = [];
		var daoFindStub = sandbox.stub(studentsDao, 'findStudentsType', function(type, cb) {
			cb(null, daoFindResults);
		});

		var daoInsertStub = sandbox.stub(studentsDao, 'insertStudents');

		var serviceCb = function(err, studentsId, message) {
			expect(err).not.to.be.null;
			expect(studentsId).to.be.null;
			expect(message).to.equal(messages.ACTIVITY_STUDENTS_TYPE_INVALID);
			assert.isTrue(daoFindStub.withArgs(studentsType).calledOnce);
			assert.equal(daoInsertStub.callCount, 0);
			done();
		};
		fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, serviceCb);		
	});

	it('Calls back with error message if insert students failed', function(done) {
		var daoFindResults = [{"type" : "1", "description" : "Classe"}];
		var daoFindStub = sandbox.stub(studentsDao, 'findStudentsType', function(type, cb) {
			cb(null, daoFindResults);
		});

		var daoInsertError = new Error('something went wrong with insert');
		var daoInsertStub = sandbox.stub(studentsDao, 'insertStudents', function(studentsObj, cb) {
			cb(daoInsertError);
		});

		var studentsMatcher = sinon.match({
    	type: studentsType,
      group_number: groupNumber,
      people_per_group: peoplePerGroup
    });

    var serviceCb = function(err, studentsId, message) {
    	expect(err).not.to.be.null;
    	expect(studentsId).to.be.null;
    	expect(message).to.equal(messages.ACTIVITY_STUDENTS_TYPE_INSERT_FAIL);
			assert.isTrue(daoFindStub.withArgs(studentsType).calledOnce);
			assert.isTrue(daoInsertStub.withArgs(studentsMatcher).calledOnce);
    	done();
    };
    fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, serviceCb);		
	});

	it('Calls back with inserted students id when successful', function(done) {
		var daoFindResults = [{"type" : "1", "description" : "Classe"}];
		var daoFindStub = sandbox.stub(studentsDao, 'findStudentsType', function(type, cb) {
			cb(null, daoFindResults);
		});

		var daoInsertedStudentsId = 98;
		var daoInsertStub = sandbox.stub(studentsDao, 'insertStudents', function(studentsObj, cb) {
			cb(null, daoInsertedStudentsId);
		});

		var studentsMatcher = sinon.match({
    	type: studentsType,
      group_number: groupNumber,
      people_per_group: peoplePerGroup
    });

    var serviceCb = function(err, studentsId, message) {
    	expect(err).to.be.null;
    	expect(studentsId).to.equal(daoInsertedStudentsId);
    	expect(message).to.be.null;
			assert.isTrue(daoFindStub.withArgs(studentsType).calledOnce);
			assert.isTrue(daoInsertStub.withArgs(studentsMatcher).calledOnce);
    	done();
    };
    fixture.insertStudents(studentsType, groupNumber, peoplePerGroup, serviceCb);		
	});

});