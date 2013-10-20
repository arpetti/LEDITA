var chai = require('chai');
var expect = require('chai').expect
chai.use(require('chai-datetime'));
var async = require('async');

var LdEditDao = require('../../../server/dao/LdEditDao');
var Dao = require('../../../server/dao/Dao');

describe('LD Edit', function () {

	var ldIdToEdit = 27;
	
	var ldOriginalLastEditDate = new Date('2013-01-11 22:21:26');
	var ldOriginalName = 'Learning Design Title Demo 27';
	var ldOriginalScopeId = 3;
	var ldOriginalPublication = 1; // Public
	var ldOriginalStudentsDescr = '20 studenti adolescenti di livello B1';
	
	var verifyLd = 'SELECT id, name, scope_id, publication, students_profile, last_edit_date FROM ld where id = ?';
	var resetLdName = 'UPDATE ld SET name = ?, last_edit_date = ? WHERE id = ?';
	var resetLdScope = 'UPDATE ld set scope_id = ?, last_edit_date = ? WHERE id = ?';
	var resetLdPublication = 'UPDATE ld set publication = ?, last_edit_date = ? WHERE id = ?';
	var resetStudentsDescr = 'UPDATE ld SET students_profile = ?, last_edit_date = ? WHERE id = ?';

	describe('Update LD Name', function() {

		afterEach(function(done) {
			Dao.insertOrUpdateRecord(resetLdName, [ldOriginalName, ldOriginalLastEditDate, ldIdToEdit], function(err, result) {
				done();
			});
		});

		it('Updates name of existing LD', function(done) {
			var today = new Date();
			var ldName = 'Modified ' + ldOriginalName;
			LdEditDao.updateLdName(ldName, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].name).to.equal(ldName);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldName = 'Some new name';
			var ldIdNotFound = 9999;
			LdEditDao.updateLdName(ldName, ldIdNotFound, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].name).to.equal(ldOriginalName);
					expect(results[0].last_edit_date).to.equalDate(ldOriginalLastEditDate);
					done();
				})
			});
		});

		it('Name is sanitized', function(done) {
			var today = new Date();
			var ldName = '; drop table ld;';
			LdEditDao.updateLdName(ldName, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].name).to.equal(ldName);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

	});

	describe('Update LD Scope', function() {

		afterEach(function(done) {
			Dao.insertOrUpdateRecord(resetLdScope, [ldOriginalScopeId, ldOriginalLastEditDate, ldIdToEdit], function(err, result) {
				done();
			});
		});

		it('Updates scope of existing LD', function(done) {
			var today = new Date();
			var ldScope = 4; // Lezione
			LdEditDao.updateLdScope(ldScope, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].scope_id).to.equal(ldScope);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldScope = 4; // Lezione
			var ldIdNotFound = 9999;
			LdEditDao.updateLdScope(ldScope, ldIdNotFound, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				// Verify LD is unmodified
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].scope_id).to.equal(ldOriginalScopeId);
					expect(results[0].last_edit_date).to.equalDate(ldOriginalLastEditDate);
					done();
				})
			});
		});

		it('Calls back with error if Scope ID does not match existing Scope', function(done) {
			var ldScope = 9999;
			LdEditDao.updateLdScope(ldScope, ldIdToEdit, function(err, result) {
				expect(err).not.to.be.null;
				expect(err.message).to.contain('fk_ld_scope1');
				expect(result).to.be.undefined;
				// Verify LD is unmodified
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].scope_id).to.equal(ldOriginalScopeId);
					expect(results[0].last_edit_date).to.equalDate(ldOriginalLastEditDate);
					done();
				})
			});
		});

	});

	describe('Update LD Publication', function() {

		afterEach(function(done) {
			Dao.insertOrUpdateRecord(resetLdPublication, [ldOriginalPublication, ldOriginalLastEditDate, ldIdToEdit], function(err, result) {
				done();
			});
		});

		it('Updates publication of existing LD', function(done) {
			var today = new Date();
			var ldPublication = 0; // Private
			LdEditDao.updateLdPublication(ldPublication, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].publication).to.equal(ldPublication);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldPublication = 0; // Private
			var ldIdNotFound = 9999;
			LdEditDao.updateLdPublication(ldPublication, ldIdNotFound, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				// Verify LD is unmodified
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].publication).to.equal(ldOriginalPublication);
					expect(results[0].last_edit_date).to.equalDate(ldOriginalLastEditDate);
					done();
				})
			});
		});

		it('LD publication column allows values that are not 0 or 1', function(done) {
			var today = new Date();
			var ldPublication = 3; // MYSQL tinyint - any non zero is considered true
			LdEditDao.updateLdPublication(ldPublication, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].publication).to.equal(ldPublication);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

	});

	describe('Update LD Students Desription', function() {

		afterEach(function(done) {
			Dao.insertOrUpdateRecord(resetStudentsDescr, [ldOriginalStudentsDescr, ldOriginalLastEditDate, ldIdToEdit], function(err, result) {
				done();
			});
		});

		it('Updates Students Description for existing LD', function(done) {
			var today = new Date();
			var ldStudentsDescr = 'Modified ' + ldOriginalStudentsDescr;
			LdEditDao.updateLdStudentsDescr(ldStudentsDescr, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].students_profile).to.equal(ldStudentsDescr);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldStudentsDescr = 'Some new students description';
			var ldIdNotFound = 9999;
			LdEditDao.updateLdStudentsDescr(ldStudentsDescr, ldIdNotFound, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].students_profile).to.equal(ldOriginalStudentsDescr);
					expect(results[0].last_edit_date).to.equalDate(ldOriginalLastEditDate);
					done();
				})
			});
		});

	});

	describe('Delete Classificates', function() {

		var originalClassificate = {qcer_id: 4, ld_id: ldIdToEdit};
		var verifyClassificates = 'SELECT qcer_id FROM classificates WHERE ld_id = ?';
		var resetClassificates = 'INSERT INTO classificates set ?';

		it('Deletes classificates for an existing LD', function(done) {
			LdEditDao.deleteClassificates(ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				Dao.findAll(verifyClassificates, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(0);
					// Put things back the way they were
					Dao.insertOrUpdateRecord(resetClassificates, originalClassificate, function(err, result) {
						done();
					});
				});
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldIdNotFound = 9999;
			LdEditDao.deleteClassificates(ldIdNotFound, function(err, result) {
				expect(err).to.be.null;
				// Verify ldIdToEdit not modified
				Dao.findAll(verifyClassificates, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].qcer_id).to.equal(originalClassificate.qcer_id);
					done();
				});
			});
		});

	});

	describe('Delete Concern', function() {

		var originalConcern = {ld_id: 15, subject_id: 5};
		var verifyConcern = 'SELECT ld_id, subject_id FROM concerns WHERE ld_id = ? and subject_id = ?';
		var resetConcern = 'INSERT INTO concerns set ?';

		it('Deletes a concern', function(done) {
			async.series([
			    function(callback){
			        console.log('Step 1: Verify concern exists');
			        Dao.findAll(verifyConcern, [originalConcern.ld_id, originalConcern.subject_id], function(err, results) {
			        	expect(err).to.be.null;
			        	expect(results).to.have.length(1);
			        	expect(results[0].ld_id).to.equal(originalConcern.ld_id);
			        	expect(results[0].subject_id).to.equal(originalConcern.subject_id);
			        	callback(null, 'Step 1');
			        });
			    },
			    function(callback){
			        console.log('Step 2: Delete the concern');
			        LdEditDao.deleteConcern(originalConcern.ld_id, originalConcern.subject_id, function(err, results) {
			        	expect(err).to.be.null;
			        	callback(null, 'Step 2');
			        });
			    },
			    function(callback){
			        console.log('Step 3: Verify concern has been removed');
			        Dao.findAll(verifyConcern, [originalConcern.ld_id, originalConcern.subject_id], function(err, results) {
			        	expect(err).to.be.null;
			        	expect(results).to.have.length(0);
			        	callback(null, 'Step 3');
			        });
			    },
			    function(callback){
			        console.log('Step 4: Put concern back the way we found it');
			        Dao.insertOrUpdateRecord(resetConcern, originalConcern, function(err, result) {
			        	expect(err).to.to.be.null;
			        	callback(null, 'Step 4');
			        });
			    },
			    function(callback){
			        console.log('Step 5: Verify concern is back to original state');
			        Dao.findAll(verifyConcern, [originalConcern.ld_id, originalConcern.subject_id], function(err, results) {
			        	expect(err).to.be.null;
			        	expect(results).to.have.length(1);
			        	expect(results[0].ld_id).to.equal(originalConcern.ld_id);
			        	expect(results[0].subject_id).to.equal(originalConcern.subject_id);
			        	callback(null, 'Step 5');
			        });
			    },
			],
			function(err, results){
				expect(err).to.be.null;
				expect(results).to.have.length(5); // test should have executed all 5 steps above
				done();
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldIdNotFound = 9999;
			async.series([
			    function(callback){
			        console.log('Step 1: Verify concern exists');
			        Dao.findAll(verifyConcern, [originalConcern.ld_id, originalConcern.subject_id], function(err, results) {
			        	expect(err).to.be.null;
			        	expect(results).to.have.length(1);
			        	expect(results[0].ld_id).to.equal(originalConcern.ld_id);
			        	expect(results[0].subject_id).to.equal(originalConcern.subject_id);
			        	callback(null, 'Step 1');
			        });
			    },
			    function(callback){
			        console.log('Step 2: Try to delete concern with unknown LD ID');
			        LdEditDao.deleteConcern(ldIdNotFound, originalConcern.subject_id, function(err, results) {
			        	expect(err).to.be.null;
			        	callback(null, 'Step 2');
			        });
			    },
			    function(callback){
			        console.log('Step 3: Verify concern is unmodified');
			        Dao.findAll(verifyConcern, [originalConcern.ld_id, originalConcern.subject_id], function(err, results) {
			        	expect(err).to.be.null;
			        	expect(results).to.have.length(1);
			        	expect(results[0].ld_id).to.equal(originalConcern.ld_id);
			        	expect(results[0].subject_id).to.equal(originalConcern.subject_id);
			        	callback(null, 'Step 3');
			        });
			    },
			],
			function(err, results){
				expect(err).to.be.null;
				expect(results).to.have.length(3); // test should have executed all 3 steps above
				done();
			});
		});

		it('Does nothing if SUBJECT ID not found', function(done) {
			var subjectIdNotFound = 9999;
			async.series([
			    function(callback){
			        console.log('Step 1: Verify concern exists');
			        Dao.findAll(verifyConcern, [originalConcern.ld_id, originalConcern.subject_id], function(err, results) {
			        	expect(err).to.be.null;
			        	expect(results).to.have.length(1);
			        	expect(results[0].ld_id).to.equal(originalConcern.ld_id);
			        	expect(results[0].subject_id).to.equal(originalConcern.subject_id);
			        	callback(null, 'Step 1');
			        });
			    },
			    function(callback){
			        console.log('Step 2: Try to delete concern with unknown SUBJECT ID');
			        LdEditDao.deleteConcern(originalConcern.ld_id, subjectIdNotFound, function(err, results) {
			        	expect(err).to.be.null;
			        	callback(null, 'Step 2');
			        });
			    },
			    function(callback){
			        console.log('Step 3: Verify concern is unmodified');
			        Dao.findAll(verifyConcern, [originalConcern.ld_id, originalConcern.subject_id], function(err, results) {
			        	expect(err).to.be.null;
			        	expect(results).to.have.length(1);
			        	expect(results[0].ld_id).to.equal(originalConcern.ld_id);
			        	expect(results[0].subject_id).to.equal(originalConcern.subject_id);
			        	callback(null, 'Step 3');
			        });
			    },
			],
			function(err, results){
				expect(err).to.be.null;
				expect(results).to.have.length(3); // test should have executed all 3 steps above
				done();
			});
		});
	});

});