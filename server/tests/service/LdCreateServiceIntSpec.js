var chai = require('chai');
var expect = require('chai').expect
chai.use(require('chai-datetime'));

var LDCreateService = require('../../service/LdCreateService');
var messages = require('../../service/ValidationMessages');
var Dao = require('../../dao/Dao')

// This is an integration test because the dependencies are not mocked out
describe('LD Create Service Integration', function() {

	var ldName = "LD Created From Integration Test";
	var existingTopicName = "Topic 1";
	var cleanupData = {name: ldName};
	var cleanupConcernsData = [ldName, existingTopicName];
	
	var cleanupClassificates = 'DELETE FROM classificates WHERE ld_id = (select id from ld where ?)';
	var cleanupLd = 'DELETE FROM ld where ?';
	var cleanupConcerns = 'DELETE FROM concerns WHERE ld_id = (select id from ld where id = ?) ' +
		'and subject_id = (select id from subject where name = ?)';

	var verifyLdQuery = 'select id, user_id, ld_model_id, name, scope, publication, students_profile, creation_date, last_edit_date from ld where id = ?';
	var verifyLdQcerQuery = 'select ld_id, qcer_name from vw_ld_qcer where ld_id = ? order by qcer_name';
	var verifyLdTopicQuery = 'select ld_name, subject_name from vw_ld_subject where ld_id = ? order by subject_name';

	afterEach(function(done) {
		Dao.deleteRecord(cleanupConcerns, cleanupConcernsData, function(err, result) {
        	Dao.deleteRecord(cleanupClassificates, cleanupData, function(err, result) {
        		Dao.deleteRecord(cleanupLd, cleanupData, function(err, result) {
	        		done();
        		})
        	})
        });
    });

	it('Creates LD and associates qcers', function(done) {
		var numExistingLds = 31; // known from demo data
		var userId = 4;
		var qcer3Name = 'B1'; // known from demo data
		var qcer6Name = 'C2'; // known from demo data
		var ldData = {
    		name: ldName,
    		qcers: {"3": true, "6": true},
    		scope: "Scope From Integration Test",
    		topics: [existingTopicName, "New Topic From Integration Test"],
    		objectives: ["Objective 1", "New Objective From Integration Test"],
    		requisites: [],
    		studentsDescription: "Students Description From Integration Test"
    	};
    	var today = new Date();

    	LDCreateService.createLd(userId, ldData, function(err, ldid, message) {
    		expect(err).to.be.null;
    		expect(message).to.be.null;
    		expect(ldid).not.to.be.null;
    		expect(ldid).to.be.above(numExistingLds);
    		
    		Dao.findAll(verifyLdQuery, [ldid], function(err, results) {
    			expect(results).to.have.length(1);
    			expect(results[0].id).to.equal(ldid);
    			expect(results[0].user_id).to.equal(userId);
    			expect(results[0].ld_model_id).to.be.null;
    			expect(results[0].name).to.equal(ldData.name);
    			expect(results[0].scope).to.equal(ldData.scope);
    			expect(results[0].publication).to.equal(0);
    			expect(results[0].students_profile).to.equal(ldData.studentsDescription);
    			expect(results[0].creation_date).to.equalDate(today);
				expect(results[0].last_edit_date).to.equalDate(today);

				Dao.findAll(verifyLdQcerQuery, [ldid], function(err, results) {
					expect(results).to.have.length(2);
					expect(results[0].ld_id).to.equal(ldid);
					expect(results[0].qcer_name).to.equal(qcer3Name);
					expect(results[1].ld_id).to.equal(ldid);
					expect(results[1].qcer_name).to.equal(qcer6Name);
					
					Dao.findAll(verifyLdTopicQuery, [ldid], function(err, results) {
						expect(results).to.have.length(1);
						expect(results[0].ld_name).to.equal(ldData.name);
						expect(results[0].subject_name).to.equal(existingTopicName);
	    				done();
					});
				});
    		});
    	});
	});

});