var chai = require('chai');
var expect = require('chai').expect
chai.use(require('chai-datetime'));

var LdCreateDao = require('../../../server/dao/LdCreateDao');
var LdDao = require('../../../server/dao/LdDao');
var Dao = require('../../../server/dao/Dao');
var _ = require('underscore');

describe('LD Create DAO', function() {

	describe('Insert Learning Design', function() {

		var ldNameToInsert = "LD Insert Test";
		var ldNameWithClassificates = "LD Insert Plus Classificates";

		afterEach(function(done) {
	        LdCreateDao.deleteLd({"name": ldNameToInsert}, function(err, result) {
	            done();
	        });
	    });

		it('Creates a new LD', function(done) {
			var expectedUserName = "Lucia";
			var expectedUserLastName = "Bianchi";
			var ldData = {
				"user_id": 2,
				"name": ldNameToInsert,
				"scope_id": 1,
				"students_profile": "Students Profile Test"
			};
			var today = new Date();
			LdCreateDao.createLd(ldData, function(err, ldid) {
				expect(err).to.be.null;
				expect(ldid).not.to.be.null;
				expect(ldid).to.be.above(0);
				LdDao.getLearningDesign(ldid, function(err, results) {
					expect(err).to.be.null
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].ld_name).to.equal(ldData.name);
					expect(results[0].ld_scope).to.equal('Lesson');
					expect(results[0].ld_students_profile).to.equal(ldData.students_profile);
					expect(results[0].ld_creation_date).to.equalDate(today);
					expect(results[0].ld_last_edit_date).to.equalDate(today);
					expect(results[0].user_name).to.equal(expectedUserName);
					expect(results[0].user_last_name).to.equal(expectedUserLastName);
					done();
				});
			});
		});

		it('Returns error if user id does not exist', function(done) {
			var ldData = {
				"user_id": 999,
				"name": ldNameToInsert,
				"scope_id": 1,
				"students_profile": "Students Profile Test"
			};
			LdCreateDao.createLd(ldData, function(err, ldid){
				expect(err).not.to.be.null;
				expect(err.message).to.contain('fk_ld_user1');
				expect(ldid).to.be.undefined;
				done();
			}); 
		});

		it('Returns error if scope id does not exist', function(done) {
			var ldData = {
				"user_id": 1,
				"name": ldNameToInsert,
				"scope_id": 999,
				"students_profile": "Students Profile Test"
			};
			LdCreateDao.createLd(ldData, function(err, ldid){
				expect(err).not.to.be.null;
				expect(err.message).to.contain('fk_ld_scope1');
				expect(ldid).to.be.undefined;
				done();
			}); 
		});

	});

	describe('Qcers', function() {

		var existingLdWithNoClassificates = 16; 

		afterEach(function(done) {
	        Dao.deleteRecord('DELETE FROM classificates WHERE ?', {ld_id: existingLdWithNoClassificates}, function(err, result) {
	        	done();
	        });
	    });

		it('Bulk inserts classificates', function(done) {
			var qcer1 = 1;
			var qcer2 = 2;
			var classificates = [
				[qcer1, existingLdWithNoClassificates],
				[qcer2, existingLdWithNoClassificates]
			];
			LdCreateDao.insertClassificates(classificates, function(err, results) {
				expect(err).to.be.null;
				expect(results).not.to.be.null;
				expect(results.affectedRows).to.equal(classificates.length);
				Dao.findAll('SELECT qcer_id, ld_id FROM classificates WHERE ld_id = ?', [existingLdWithNoClassificates], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.to.have.length(classificates.length);					
					expect(_.contains(_.pluck(results, "qcer_id"), qcer1)).to.be.true;
					expect(_.contains(_.pluck(results, "qcer_id"), qcer2)).to.be.true;
					done();
				});
			});
		});

		it('Bulk inserts returns error if classificates is empty', function(done) {
			var classificates = [];
			LdCreateDao.insertClassificates(classificates, function(err, results) {
				expect(err).not.to.be.null;
				expect(results).to.be.undefined;
				done();
			});
		});

	});

	describe('Subjects', function() {
		
		var subject3 = 'single insert subject test 3';
		var cleanupSubjects = [subject3];

		afterEach(function(done) {
			Dao.deleteRecord('DELETE FROM subject where name in (?)', cleanupSubjects, function(err, result) {
				done();
			});
		});

		it('Inserts a single subject', function(done) {
			var subjectData = {"name": subject3};
			LdCreateDao.insertSubject(subjectData, function(err, subjectId) {
				expect(err).to.be.null;
				expect(subjectId).to.be.above(0);
				done();
			});
		});

		it('Multiple subjects with same name are not allowed', function(done) {
			var existingSubject = 'Topic 4'; // known from demo data
			var subjectData = {"name": existingSubject};
			LdCreateDao.insertSubject(subjectData, function(err, subjectId) {
				expect(err).not.to.be.null;
				expect(err.message).to.contain('UNIQ_SUBJECT');
				expect(subjectId).to.be.undefined;
				done();
			});
		});

	});

	describe('Concerns', function() {

		// known from demo data that LD 7 is not already associated to these subjects
		var ldid = 7;
		var subjectId1 = 1;
		var subjectId3 = 3;

		var verifyLdConcerns = 'SELECT subject_id FROM concerns where ld_id = ?';

		var cleanupData = [ldid, subjectId1, subjectId3];
		var cleanupConcerns = 'DELETE FROM concerns where ld_id = ' + ldid +  
			' and subject_id in (' + subjectId1 + ', ' + subjectId3 + ')';

		afterEach(function(done) {
			Dao.deleteRecord(cleanupConcerns, [], function(err, results) {
				done();
			});
		});

		it('Bulk inserts multiple concerns at once', function(done) {
			var concerns = [[subjectId1, ldid], [subjectId3, ldid]];
			LdCreateDao.insertConcerns(concerns, function(err, results) {
				expect(err).to.be.null;
				expect(results).not.to.be.null;
				expect(results.affectedRows).to.equal(concerns.length);
				Dao.findAll(verifyLdConcerns, [ldid], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length.above(2);
					expect(_.contains(_.pluck(results, "subject_id"), subjectId1)).to.be.true;
					expect(_.contains(_.pluck(results, "subject_id"), subjectId3)).to.be.true;
					done();
				});
			});
		});

		it('Bulk inserts returns an error if concerns are empty', function(done) {
			var concerns = [];
			LdCreateDao.insertConcerns(concerns, function(err, result) {
				expect(err).not.to.be.null;
				expect(result).to.be.undefined;
				done();
			});
		});

		it('Inserts a single concern', function(done) {
			var concernData = {subject_id: subjectId1, ld_id: ldid};
			LdCreateDao.insertConcern(concernData, function(err, id) {
				expect(err).to.be.null;
				Dao.findAll(verifyLdConcerns, [ldid], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length.above(1);
					expect(_.contains(_.pluck(results, "subject_id"), subjectId1)).to.be.true;
					done();
				});
			});
		});

	});

	describe('Objectives', function() {

		var newObjective = 'Basket Weaving';
		var cleanupObjectives = [newObjective];

		afterEach(function(done) {
			Dao.deleteRecord('DELETE FROM objective where descr in (?)', cleanupObjectives, function(err, result) {
				done();
			});
		});

		it('Inserts a single objective', function(done) {
			var objectiveData = {"descr": newObjective};
			LdCreateDao.insertObjective(objectiveData, function(err, objectiveId) {
				expect(err).to.be.null;
				expect(objectiveId).to.be.above(0);
				done();
			});
		});

		it('Multiple objectives with same name are not allowed', function(done) {
			var existingObjective = 'Objective 5'; // known from demo data
			var objectiveData = {"descr": existingObjective};
			LdCreateDao.insertObjective(objectiveData, function(err, objectiveId) {
				expect(err).not.to.be.null;
				expect(err.message).to.contain('UNIQ_OBJECTIVE');
				expect(objectiveId).to.be.undefined;
				done();
			});
		});

	});

	describe('Aims', function() {

		// known from demo data that LD 26 is not already associated to these objectives
		var ldid = 26;
		var objective3 = 3;
		var objective4 = 4;

		var verifyLdAims = 'SELECT objective_id FROM aims where ld_id = ?';
		var cleanupAims = 'DELETE FROM aims where ld_id = ' + ldid +  
			' and objective_id in (' + objective3 + ', ' + objective4 + ')';

		afterEach(function(done) {
			Dao.deleteRecord(cleanupAims, [], function(err, results) {
				done();
			});
		});

		it('Bulk inserts multiple aims at once', function(done) {
			var aims = [[objective3, ldid], [objective4, ldid]];
			LdCreateDao.insertAims(aims, function(err, results) {
				expect(err).to.be.null;
				expect(results).not.to.be.null;
				expect(results.affectedRows).to.equal(aims.length);
				Dao.findAll(verifyLdAims, [ldid], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length.above(2);
					expect(_.contains(_.pluck(results, "objective_id"), objective3)).to.be.true;
					expect(_.contains(_.pluck(results, "objective_id"), objective4)).to.be.true;
					done();
				});
			});
		});

		it('Bulk inserts returns an error if aims are empty', function(done) {
			var aims = [];
			LdCreateDao.insertAims(aims, function(err, result) {
				expect(err).not.to.be.null;
				expect(result).to.be.undefined;
				done();
			});
		});

		it('Inserts a single aim', function(done) {
			var aimData = {objective_id: objective3, ld_id: ldid};
			LdCreateDao.insertAim(aimData, function(err, id) {
				expect(err).to.be.null;
				Dao.findAll(verifyLdAims, [ldid], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length.above(1);
					expect(_.contains(_.pluck(results, "objective_id"), objective3)).to.be.true;
					done();
				});
			});
		});

	});

	describe('NEEDS', function() {

		// Known from demo data that LD 2 is not already associated to these objectives
		var ldId = 2;
		var objectiveId7 = 7;
		var objectiveId8 = 8;

		var verifyLdNeeds = 'SELECT objective_id FROM needs where ld_id = ? and objective_id is not null';
		var cleanupNeeds = 'DELETE FROM needs where ld_id = ' + ldId +  
			' and objective_id in (' + objectiveId7 + ', ' + objectiveId8 + ')';

		afterEach(function(done) {
			Dao.deleteRecord(cleanupNeeds, [], function(err, results) {
				done();
			});
		});

		it('Bulk inserts multiple needs at once', function(done) {
			var needs = [[objectiveId7, ldId], [objectiveId8, ldId]];
			LdCreateDao.bulkInsertNeeds(needs, function(err, results) {
				expect(err).to.be.null;
				expect(results).not.to.be.null;
				expect(results.affectedRows).to.equal(needs.length);
				Dao.findAll(verifyLdNeeds, [ldId], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(2);
					expect(_.contains(_.pluck(results, "objective_id"), objectiveId7)).to.be.true;
					expect(_.contains(_.pluck(results, "objective_id"), objectiveId8)).to.be.true;
					done();
				});
			});
		});

		it('Bulk insert needs returns an error if needs are empty', function(done) {
			var needs = [];
			LdCreateDao.bulkInsertNeeds(needs, function(err, result) {
				expect(err).not.to.be.null;
				expect(result).to.be.undefined;
				done();
			});
		});

		it('Inserts a single need', function(done) {
			var needData = {objective_id: objectiveId7, ld_id: ldId};
			LdCreateDao.insertNeed(needData, function(err, id) {
				expect(err).to.be.null;
				Dao.findAll(verifyLdNeeds, [ldId], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(1);
					expect(_.contains(_.pluck(results, "objective_id"), objectiveId7)).to.be.true;
					done();
				});
			});
		});

	});

});