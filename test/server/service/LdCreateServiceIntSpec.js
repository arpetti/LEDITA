var chai = require('chai');
var expect = require('chai').expect
chai.use(require('chai-datetime'));

var LDCreateService = require('../../../server/service/LdCreateService');
var messages = require('../../../server/service/ValidationMessages');
var Dao = require('../../../server/dao/Dao')
var async = require('async');
var _ = require('underscore');

// This is an integration test because the dependencies are not mocked out
describe('LD Create Service Integration', function() {

	var numExistingLds = 31; // known from demo data
	var ldName = "LD Created From Integration Test";
	var newScopeName = "Seminar New Integration Test";
	var existingTopicName = "Topic 1";
	var newTopicName = "New Topic From Integration Test";
	var existingObjective = "Objective 1";
	var newObjective = "New Objective from Integration Test";
	var existingRequisite = "Objective 2";
	var newRequisite = "New Requisite from Integration Test";
	
	var cleanupData = {name: ldName};
	
	var cleanupClassificates = 'DELETE FROM classificates WHERE ld_id = (select id from ld where ?)';
	var cleanupLd = 'DELETE FROM ld where ?';
	var cleanupConcerns = 'DELETE FROM concerns WHERE ld_id = (select id from ld where ?)';
	var cleanupSubjects = 'DELETE FROM subject where name = ?';
	var cleanupAims = 'DELETE FROM aims where ld_id = (select id from ld where ?)';
	var cleanupNeeds = 'DELETE FROM needs where ld_id = (select id from ld where ?)';
	var cleanupObjectives = 'DELETE FROM objective where descr = ?';
	var cleanupPrerequisites = 'DELETE FROM objective where descr = ?';
	var cleanupScope = 'DELETE FROM scope where name = ?';

	var verifyLdQuery = 'select id, user_id, ld_model_id, name, scope_id, publication, students_profile, creation_date, last_edit_date from ld where id = ?';
	var verifyLdQcerQuery = 'select ld_id, qcer_name from vw_ld_qcer where ld_id = ? order by qcer_name';
	var verifyLdTopicQuery = 'select ld_name, subject_name from vw_ld_subject where ld_id = ? order by subject_name';
	var verifySubjectQuery = 'select id, name from subject where name = ?';
	var verifyLdObjectiveQuery = 'select ld_name, objective_descr from vw_ld_objective where ld_id = ?';
	var verifyLdPrerequisiteQuery = 'select ld_name, prereq_name, prereq_type from vw_ld_prerequisite where ld_id = ?';
	var verifyObjectiveQuery = 'select id, descr from objective where descr = ?';
	var verifyScopeQuery = 'select id, name from scope where name = ?';

	afterEach(function(done) {
		async.series([
			function(callback){
		        Dao.deleteRecord(cleanupNeeds, cleanupData, function(err, results) {
			        callback(null, null);
		        })
		    },
			function(callback){
		        Dao.deleteRecord(cleanupAims, cleanupData, function(err, results) {
			        callback(null, null);
		        })
		    },
			function(callback){
		        Dao.deleteRecord(cleanupObjectives, [newObjective], function(err, results) {
			        callback(null, null);
		        })
		    },
		    function(callback){
		        Dao.deleteRecord(cleanupPrerequisites, [newRequisite], function(err, results) {
			        callback(null, null);
		        })
		    },
		    function(callback){
		        Dao.deleteRecord(cleanupConcerns, cleanupData, function(err, results) {
			        callback(null, null);
		        })
		    },
		    function(callback){
		        Dao.deleteRecord(cleanupSubjects, [newTopicName], function(err, results) {
			        callback(null, null);
		        })
		    },
		    function(callback){
		        Dao.deleteRecord(cleanupClassificates, cleanupData, function(err, results) {
		        	callback(null, null);
		        })
		    },
		    function(callback){
		        Dao.deleteRecord(cleanupLd, cleanupData, function(err, results) {
		        	callback(null, null);
		        })
		    },
		    function(callback){
		    	Dao.deleteRecord(cleanupScope, [newScopeName], function(err, results) {
		    		callback(null, null);
		    	});
		    }
		],
		function(err, results ) {
		    done();
		});
    });

	// TODO: Add another integration test where new scope is created
	it('Creates LD, child entities, and associations', function(done) {
		var userId = 4;
		var qcer3Name = 'B1'; // known from demo data
		var qcer6Name = 'C2'; // known from demo data
		var ldData = {
    		name: ldName,
    		qcers: {"3": true, "6": true},
    		scope: "Lesson",
    		topics: [existingTopicName, newTopicName],
    		objectives: [existingObjective, newObjective],
    		requisites: [existingRequisite, newRequisite],
    		studentsDescription: "Students Description From Integration Test"
    	};
    	var today = new Date();

    	LDCreateService.createLd(userId, ldData, function(err, ldid, message) {
    		expect(err).to.be.null;
    		expect(message).to.be.null;
    		expect(ldid).not.to.be.null;
    		expect(ldid).to.be.above(numExistingLds);
    		
    		// Verify newly created LD
    		Dao.findAll(verifyLdQuery, [ldid], function(err, results) {
    			expect(results).to.have.length(1);
    			expect(results[0].id).to.equal(ldid);
    			expect(results[0].user_id).to.equal(userId);
    			expect(results[0].ld_model_id).to.be.null;
    			expect(results[0].name).to.equal(ldData.name);
    			expect(results[0].scope_id).to.equal(1);
    			expect(results[0].publication).to.equal(0);
    			expect(results[0].students_profile).to.equal(ldData.studentsDescription);
    			expect(results[0].creation_date).to.equalDate(today);
				expect(results[0].last_edit_date).to.equalDate(today);

				// Verify LD to Qcer relationships
				Dao.findAll(verifyLdQcerQuery, [ldid], function(err, results) {
					expect(results).to.have.length(2);
					expect(results[0].ld_id).to.equal(ldid);
					expect(results[0].qcer_name).to.equal(qcer3Name);
					expect(results[1].ld_id).to.equal(ldid);
					expect(results[1].qcer_name).to.equal(qcer6Name);
					
					// Verify LD to Topic relationships
					Dao.findAll(verifyLdTopicQuery, [ldid], function(err, results) {
						expect(results).to.have.length(2);
						expect(_.contains(_.pluck(results, "ld_name"), ldData.name)).to.be.true;
						expect(_.contains(_.pluck(results, "subject_name"), existingTopicName)).to.be.true;
						expect(_.contains(_.pluck(results, "subject_name"), newTopicName)).to.be.true;

						// Verify newly created Topic
						Dao.findAll(verifySubjectQuery, [newTopicName], function(err, results) {
							expect(results).to.have.length(1);
							expect(results[0].id).not.to.be.null;
							expect(results[0].name).to.equal(newTopicName);

							// Verify LD to Objective relationships
							Dao.findAll(verifyLdObjectiveQuery, [ldid], function(err, results) {
								expect(results).to.have.length(2);
								expect(_.contains(_.pluck(results, "ld_name"), ldData.name)).to.be.true;
								expect(_.contains(_.pluck(results, "objective_descr"), existingObjective)).to.be.true;
								expect(_.contains(_.pluck(results, "objective_descr"), newObjective)).to.be.true;

								// Verify newly created Objective
								Dao.findAll(verifyObjectiveQuery, [newObjective], function(err, results) {
									expect(results).to.have.length(1);
									expect(results[0].id).not.to.be.null;
									expect(results[0].descr).to.equal(newObjective);

									// Verify prerequisites
									Dao.findAll(verifyLdPrerequisiteQuery, [ldid], function(err, results) {
										expect(results).to.to.have.length(2);
										expect(_.contains(_.pluck(results, "prereq_name"), existingRequisite)).to.be.true;
										expect(_.contains(_.pluck(results, "prereq_name"), newRequisite)).to.be.true;
	    								done();
									});
								});
							})
						})
					});
				});
    		});
    	});
	});

	it('Creates a new scope if not already existing', function(done) {
		var qcer3Name = 'B1'; // known from demo data
		var qcer6Name = 'C2'; // known from demo data
		var userId = 4;
		var ldData = {
    		name: ldName,
    		qcers: {"3": true, "6": true},
    		scope: newScopeName,
    		topics: [existingTopicName, newTopicName],
    		objectives: [existingObjective, newObjective],
    		requisites: [existingRequisite, newRequisite],
    		studentsDescription: "Students Description From Integration Test"
    	};
    	var today = new Date();

    	LDCreateService.createLd(userId, ldData, function(err, ldid, message) {
    		expect(err).to.be.null;
    		expect(message).to.be.null;
    		expect(ldid).not.to.be.null;
    		expect(ldid).to.be.above(numExistingLds);
    		
    		// Verify newly created LD
    		Dao.findAll(verifyLdQuery, [ldid], function(err, results) {
    			var newScopeId = results[0].scope_id;
    			expect(results).to.have.length(1);
    			expect(results[0].id).to.equal(ldid);
    			expect(results[0].user_id).to.equal(userId);
    			expect(results[0].ld_model_id).to.be.null;
    			expect(results[0].name).to.equal(ldData.name);
    			expect(results[0].scope_id).to.be.above(4); // known from demo data
    			expect(results[0].publication).to.equal(0);
    			expect(results[0].students_profile).to.equal(ldData.studentsDescription);
    			expect(results[0].creation_date).to.equalDate(today);
				expect(results[0].last_edit_date).to.equalDate(today);

				// Verify newly created Scope
				Dao.findAll(verifyScopeQuery, [newScopeName], function(err, results) {
					expect(results).to.have.length(1);
					expect(results[0].id).to.equal(newScopeId);
					expect(results[0].name).to.equal(newScopeName);
					done();
				})
			});
		});

	});

});