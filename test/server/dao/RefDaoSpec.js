var expect = require('chai').expect
var RefDao = require('../../../server/dao/RefDao');
var _ = require('underscore');

describe('Reference Data Dao', function() {

	describe('QCER', function() {

		it('Gets all qcers', function(done) {
			RefDao.getQcers(function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(6);
				expect(results[0].name).to.equal('A1');
				expect(results[1].name).to.equal('A2');
				expect(results[2].name).to.equal('B1');
				expect(results[3].name).to.equal('B2');
				expect(results[4].name).to.equal('C1');
				expect(results[5].name).to.equal('C2');
				done();
			});
		});

	});

	describe('SUBJECT', function() {

		var verifySubjects = function(results) {
			expect(results).to.have.length(5);
			expect(results[0].name).to.equal('Topic 1');
			expect(results[1].name).to.equal('Topic 2');
			expect(results[2].name).to.equal('Topic 3');
			expect(results[3].name).to.equal('Topic 4');
			expect(results[4].name).to.equal('Topic 5');
		}

		it('Finds subjects matched by beginning of string', function(done) {
			var partial = ['To'];
			RefDao.getSubjectsMatching(partial, function(err, results) {
				expect(err).to.be.null;
				verifySubjects(results);
				done();
			});
		});

		it('Finds subjects matched by middle of string', function(done) {
			var partial = ['opi'];
			RefDao.getSubjectsMatching(partial, function(err, results) {
				expect(err).to.be.null;
				verifySubjects(results);
				done();
			});
		});

		it('Subject matching is case insensitive', function(done) {
			var partial = ['to'];
			RefDao.getSubjectsMatching(partial, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(5);
				done();
			});
		});

		it('Subject matching returns empty list if nothing matched', function(done) {
			var partial = ['xyz'];
			RefDao.getSubjectsMatching(partial, function(err, results) {
				expect(err).to.be.null;
				expect(results).not.to.be.null;
				expect(results).to.have.length(0);
				done();
			});
		});

		it('Finds subjects by name', function(done) {
			var existSubject1 = 'Topic 3';
			var existSubject2 = 'Sentimenti';
			var notExistSubject3 = 'my new subject';
			var subjectNames = [existSubject1, existSubject2, notExistSubject3];
			RefDao.findSubjectsByName(subjectNames, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(2);
				expect(_.contains(_.pluck(results, "name"), existSubject1)).to.be.true;
				expect(_.contains(_.pluck(results, "name"), existSubject2)).to.be.true;
				expect(_.contains(_.pluck(results, "name"), notExistSubject3)).to.be.false;
				done();
			});
		});

		it('Find subjects by name returns empty list when none found', function(done) {
			var subjectNames = ['Goats', 'Donkeys'];
			RefDao.findSubjectsByName(subjectNames, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(0);
				done();
			});
		});

		it('Find subjects by name returns error when given empty input', function(done) {
			var subjectNames = [];
			RefDao.findSubjectsByName(subjectNames, function(err, results) {
				expect(err).not.to.be.null;
				expect(results).to.be.undefined;
				done();
			});
		});

	});

	describe('OBJECTIVE', function() {

		it('Finds objectives matched by beginning of string', function(done) {
			var partial = ['Les'];
			RefDao.getObjectivesMatching(partial, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(2);
				expect(results[0].descr).to.equal('Lessico relativo ai sentimenti');
				expect(results[1].descr).to.equal('Lessico relativo al cibo');
				done();
			});
		});

		it('Finds objectives matched by middle of string', function(done) {
			var partial = ['jecti'];
			RefDao.getObjectivesMatching(partial, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(6);
				expect(results[0].descr).to.equal('Objective 1');
				expect(results[1].descr).to.equal('Objective 2');
				expect(results[2].descr).to.equal('Objective 3');
				expect(results[3].descr).to.equal('Objective 4');
				expect(results[4].descr).to.equal('Objective 5');
				expect(results[5].descr).to.equal('Objective 6');
				done();
			});
		});

		it('Objective matching is case insensitive', function(done) {
			var partial = ['frasi'];
			RefDao.getObjectivesMatching(partial, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(1);
				expect(results[0].descr).to.equal('Frasi idiomatiche sui sentimenti');
				done();
			});
		});

		it('Objective matching returns empty list if nothing matched', function(done) {
			var partial = ['xyz'];
			RefDao.getObjectivesMatching(partial, function(err, results) {
				expect(err).to.be.null;
				expect(results).not.to.be.null;
				expect(results).to.have.length(0);
				done();
			});
		});

		it('Finds objectives by name', function(done) {
			var existObjective1 = 'Objective 1';
			var existObjectivet2 = 'Objective 2';
			var notExistObjective3 = 'my new objective';
			var objectiveNames = [existObjective1, existObjectivet2, notExistObjective3];
			RefDao.findObjectivesByName(objectiveNames, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(2);
				expect(_.contains(_.pluck(results, "descr"), existObjective1)).to.be.true;
				expect(_.contains(_.pluck(results, "descr"), existObjectivet2)).to.be.true;
				expect(_.contains(_.pluck(results, "descr"), notExistObjective3)).to.be.false;
				done();
			});
		});

		it('Find objectives by name returns empty list when none found', function(done) {
			var objectiveNames = ['Rowing', 'Swimming'];
			RefDao.findObjectivesByName(objectiveNames, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(0);
				done();
			});
		});

		it('Find objectives by name returns error when given empty input', function(done) {
			var objectiveNames = [];
			RefDao.findObjectivesByName(objectiveNames, function(err, results) {
				expect(err).not.to.be.null;
				expect(results).to.be.undefined;
				done();
			});
		});

	});

});