var expect = require('chai').expect
var Dao = require('../../dao/Dao');
var configHelper = require('../../util/ConfigHelper');
var config = configHelper.config();
var async = require('async');

describe('DAO', function() {    

	it('Connection is released back to the pool upon error', function(done) {
		var poolSize = config.db_pool_connection_limit;
		var badQueries = [];
		for (var i = 0; i < poolSize+5; i++) {
			badQueries.push('select foo from bar');
		}
		async.each(badQueries, function(badQ, callback) {
			Dao.findAll(badQ, [], function(err, result) {
				expect(err).not.to.be.null;
				callback();
			});
		}, function(err) {
			done();
		});
	});

	it('Find all users returns results', function(done) {
        var queryString = 'select id, name, last_name, email from user';
        var queryParams = [];
		Dao.findAll(queryString, queryParams, function(err, results){
			expect(results).to.have.length.above(4);
            done();
		});
    });

    it('Find user by email returns one result', function(done) {
        var queryString = 'select id, name, last_name, email from user where email = ?';
        var queryParams = ['mario@email.it'];
        Dao.findAll(queryString, queryParams, function(err, results){
            expect(results).to.have.length(1);
            expect(results[0].name).to.equal('Mario');
            expect(results[0].last_name).to.equal('Rossi');
            expect(results[0].email).to.equal('mario@email.it');
            done();
        });
    });

    it('Find learning designs by scope and ld_model_id returns one result', function(done) {
        var queryString = 'select name, scope, ld_model_id from ld where scope = ? and ld_model_id = ?';
        var queryParams = ['Lesson', 5];
        Dao.findAll(queryString, queryParams, function(err, results){
            expect(results).to.have.length(3);
            expect(results[0].name).to.equal('Learning Design Title Demo 7');
            expect(results[0].scope).to.equal('Lesson');
            expect(results[0].ld_model_id).to.equal(5);
            done();
        });
    });

    describe('Unique Constraints', function() {

	    it('Cannot insert duplicate QCER', function(done) {
	    	var queryString = 'insert into qcer set ?';
	    	var jsonData = {"name": "A1"};
	    	Dao.insertRecord(queryString, jsonData, function(err, insertedId) {
	    		expect(insertedId).to.be.undefined;
	    		expect(err).not.to.be.null;
	    		expect(err.message).to.contain('UNIQ_QCER');
	    		done();
	    	});
	    });

	    it('Cannot insert duplicate SUBJECT', function(done) {
	    	var queryString = 'insert into subject set ?';
	    	var jsonData = {"name": "Topic 5"};
	    	Dao.insertRecord(queryString, jsonData, function(err, insertedId) {
	    		expect(insertedId).to.be.undefined;
	    		expect(err).not.to.be.null;
	    		expect(err.message).to.contain('UNIQ_SUBJECT');
	    		done();
	    	});
	    });

	    it('Cannot insert duplicate OBJECTIVE', function(done) {
	    	var queryString = 'insert into objective set ?';
	    	var jsonData = {"descr": "Objective 6"};
	    	Dao.insertRecord(queryString, jsonData, function(err, insertedId) {
	    		expect(insertedId).to.be.undefined;
	    		expect(err).not.to.be.null;
	    		expect(err.message).to.contain('UNIQ_OBJECTIVE');
	    		done();
	    	});
	    });

    });


});	