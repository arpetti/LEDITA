var chai = require('chai');
var expect = require('chai').expect
chai.use(require('chai-datetime'));

var LdEditService = require('../../../server/service/LdEditService');
var messages = require('../../../server/validate/ValidationMessages');
var Dao = require('../../../server/dao/Dao')
var async = require('async');
var _ = require('underscore');

// This is an integration test because the dependencies are not mocked out
describe('LD Edit Service Integration', function() {

	describe('Update LD Scope', function() {

		var insertLdQuery = 'INSERT INTO ld SET ?';
		var ldData = {
			user_id: 5,
			name: 'LD Edit Scope Integration Test Name',
			scope_id: 1,
			publication: 0,
			students_profile: 'LD Edit Scope Integration Test Students Profile',
			creation_date: new Date('2013-01-11'),
			last_edit_date: new Date('2013-02-22')
		};
		var scope = 'Year Long Seminar';
		var verifyLdQuery = 'SELECT id, name, scope_id, publication, students_profile, creation_date, last_edit_date, user_id FROM ld where id = ?';
		var deleteLdQuery = 'DELETE FROM ld WHERE name = ?';
		var verifyScopeQuery = 'SELECT id, name FROM scope WHERE name = ?';
		var deleteScopeQuery = 'DELETE FROM scope WHERE name = ?';

		afterEach(function(done) {
			async.series([
				function(callback){
			        Dao.deleteRecord(deleteLdQuery, [ldData.name], function(err, results) {
				        callback(null, null);
			        })
			    },
				function(callback){
			        Dao.deleteRecord(deleteScopeQuery, [scope], function(err, results) {
				        callback(null, null);
			        })
			    }
			],
			function(err, results ) {
			    done();
			});
	    });

		it('Updates LD to a new Scope', function(done) {
			var today = new Date();
			async.waterfall([
				function(callback) {
					console.log('');
					console.log('Step 1: Insert a new LD');
					Dao.insertOrUpdateRecord(insertLdQuery, ldData, function(err, ldId) {
						expect(err).to.be.null;
						expect(ldId).to.be.above(0);
						callback(null, ldId);
					});
				},
	            function(ldId, callback) {
	            	console.log('Step 2: Modify LD Scope for a new Scope');
	            	LdEditService.updateLdScope(scope, ldId, function(err, result) {
	            		expect(err).to.be.undefined;
	            		expect(result).to.be.undefined;
	            		callback(null, ldId);
	            	})
	            },
	            function(ldId, callback) {
	            	console.log('Step 3: Verify newly created SCOPE entity');
	            	Dao.findAll(verifyScopeQuery, [scope], function(err, results) {
	            		expect(err).to.be.null;
	            		expect(results).to.have.length(1);
	            		expect(results[0].name).to.equal(scope);
	            		expect(results[0].id).to.be.above(1);
	            		callback(null, ldId, results[0].id);
	            	});
	            },
	            function(ldId, scopeId, callback) {
	            	console.log('Step 4: Verify LD is modified with respect to SCOPE and last edit date');
	            	Dao.findAll(verifyLdQuery, [ldId], function(err, results) {
	            		expect(err).to.be.null;
	            		expect(results).to.have.length(1);
	            		expect(results[0].id).to.equal(ldId);
	            		expect(results[0].scope_id).to.equal(scopeId);
	            		expect(results[0].last_edit_date).to.equalDate(today);
	            		callback(null, ldId);
	            	});
	            }
	        ], function (err, ldId) {
	           		done();
	        	}
	        );
		});

		it('Updates LD to an existing Scope', function(done) {
			var today = new Date();
			var existingScope = 'Semester';
			var existingScopeId = 3; // known from demo data
			async.waterfall([
				function(callback) {
					console.log('');
					console.log('Step 1: Insert a new LD');
					Dao.insertOrUpdateRecord(insertLdQuery, ldData, function(err, ldId) {
						expect(err).to.be.null;
						expect(ldId).to.be.above(0);
						callback(null, ldId);
					});
				},
	            function(ldId, callback) {
	            	console.log('Step 2: Modify LD for an existing scope');
	            	LdEditService.updateLdScope(existingScope, ldId, function(err, result) {
	            		expect(err).to.be.undefined;
	            		expect(result).to.be.undefined;
	            		callback(null, ldId);
	            	})
	            },
	            function(ldId, callback) {
	            	console.log('Step 3: Verify existing SCOPE entity');
	            	Dao.findAll(verifyScopeQuery, [existingScope], function(err, results) {
	            		expect(err).to.be.null;
	            		expect(results).to.have.length(1);
	            		expect(results[0].name).to.equal(existingScope);
	            		expect(results[0].id).to.equal(existingScopeId)
	            		callback(null, ldId, results[0].id);
	            	});
	            },
	            function(ldId, scopeId, callback) {
	            	console.log('Step 4: Verify LD is modified with respect to SCOPE and last edit date');
	            	Dao.findAll(verifyLdQuery, [ldId], function(err, results) {
	            		expect(err).to.be.null;
	            		expect(results).to.have.length(1);
	            		expect(results[0].id).to.equal(ldId);
	            		expect(results[0].scope_id).to.equal(scopeId);
	            		expect(results[0].last_edit_date).to.equalDate(today);
	            		callback(null, ldId);
	            	});
	            }
	        ], function (err, ldId) {
	           		done();
	        	}
	        );
		});
	});

	describe('Add Topic', function() {

		var ldId = 10;	
		var existingTopic = 'Topic 2';
		var existingTopicAlreadyConcern = 'Topic 5'; // known from demo data, ldID10 has concern 5
		var newTopic = 'Topic 99';

		var verifyConcern = 'SELECT subject_name from vw_ld_subject where ld_id = ? and subject_name = ?';
		
		var cleanupConcern = 'DELETE FROM concerns where ld_id = ? and subject_id = (select id from subject where name = ?)';
		var cleanupTopic = 'DELETE FROM subject where name = ?';

		afterEach(function(done) {
			async.series([
				function(callback){
			        Dao.deleteRecord(cleanupConcern, [ldId, existingTopic], function(err, results) {
				        callback(null, null);
			        })
			    },
			    function(callback){
			        Dao.deleteRecord(cleanupConcern, [ldId, newTopic], function(err, results) {
				        callback(null, null);
			        })
			    },
			    function(callback){
			        Dao.deleteRecord(cleanupTopic, [newTopic], function(err, results) {
				        callback(null, null);
			        })
			    }
			],
			function(err, results ) {
			    done();
			});
	    });

		it('Adds existing topic to LD', function(done) {
			LdEditService.addTopic(existingTopic, ldId, function() {
				Dao.findAll(verifyConcern, [ldId, existingTopic], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].subject_name).to.equal(existingTopic);
					done();
				})
			});
		});

		// Investigate: passes individually but fails as part of suite
		it.skip('Adds new topic to LD', function(done) {
			LdEditService.addTopic(newTopic, ldId, function() {
				Dao.findAll(verifyConcern, [ldId, newTopic], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].subject_name).to.equal(newTopic);
					done();
				})
			});
		});

		it('Does nothing if concern already exists', function(done) {
			LdEditService.addTopic(existingTopicAlreadyConcern, ldId, function() {
				// Verify existing concern remains in place
				Dao.findAll(verifyConcern, [ldId, existingTopicAlreadyConcern], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].subject_name).to.equal(existingTopicAlreadyConcern);
					done();
				})
			});
		});
	});
});