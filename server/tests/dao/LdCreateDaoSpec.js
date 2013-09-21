var chai = require('chai');
var expect = require('chai').expect
chai.use(require('chai-datetime'));

var LdCreateDao = require('../../dao/LdCreateDao');
var LdDao = require('../../dao/LdDao');
var Dao = require('../../dao/Dao');

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
				"scope": "Scope Test",
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
					expect(results[0].ld_scope).to.equal(ldData.scope);
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
				"scope": "Scope Test",
				"students_profile": "Students Profile Test"
			};
			LdCreateDao.createLd(ldData, function(err, ldid){
				expect(err).not.to.be.null;
				expect(err.message).to.contain('fk_ld_user1');
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
				done();
			});
		});

	});


});