var expect = require('chai').expect
var Dao = require('../../../server/dao/Dao');
var configHelper = require('../../../server/util/ConfigHelper');
var config = configHelper.config();
var async = require('async');
var _ = require('underscore');

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
        var queryString = 'select name, scope_id, ld_model_id from ld where scope_id = ? and ld_model_id = ?';
        var queryParams = [1, 5];
        Dao.findAll(queryString, queryParams, function(err, results){
            expect(results).to.have.length(3);
            expect(results[0].name).to.equal('Learning Design Title Demo 7');
            expect(results[0].scope_id).to.equal(1);
            expect(results[0].ld_model_id).to.equal(5);
            done();
        });
    });

    it('Supports multiple statements', function(done) {
    	var statement1 = 'select id, name from ld where id = ?';
    	var statement2 = 'select id, name from ld where id = ?';
    	var statements = statement1 + '; ' + statement2;
    	var params = [2, 3];
    	Dao.multiStatement(statements, params, function(err, results) {
    		expect(err).to.be.null;
    		expect(results).to.have.length(2);
    		expect(_.contains(_.pluck(_.flatten(results), "id"), params[0])).to.be.true;
    		expect(_.contains(_.pluck(_.flatten(results), "name"), 'Learning Design Title Demo 2')).to.be.true;
    		expect(_.contains(_.pluck(_.flatten(results), "id"), params[1])).to.be.true;
    		expect(_.contains(_.pluck(_.flatten(results), "name"), 'Learning Design Title Demo 3')).to.be.true;
    		done();
    	});
    });

    it('Multi statement parameters are escaped', function(done) {
    	var statement1 = 'select id, name from ld where id = ?';
    	var statement2 = 'select id, name from ld where id = ?';
    	var statements = statement1 + '; ' + statement2;
    	var params = [2, '3 or 1=1'];
    	Dao.multiStatement(statements, params, function(err, results) {
    		expect(err).to.be.null;
    		expect(results).to.have.length(2);
    		expect(_.contains(_.pluck(_.flatten(results), "id"), params[0])).to.be.true;
    		expect(_.contains(_.pluck(_.flatten(results), "name"), 'Learning Design Title Demo 2')).to.be.true;
    		expect(_.contains(_.pluck(_.flatten(results), "id"), 3)).to.be.true;
    		expect(_.contains(_.pluck(_.flatten(results), "name"), 'Learning Design Title Demo 3')).to.be.true;
    		done();
    	});
    });

    describe('Unique Constraints', function() {

	    it('Cannot insert duplicate QCER', function(done) {
	    	var queryString = 'insert into qcer set ?';
	    	var jsonData = {"name": "A1"};
	    	Dao.insertOrUpdateRecord(queryString, jsonData, function(err, insertedId) {
	    		expect(insertedId).to.be.undefined;
	    		expect(err).not.to.be.null;
	    		expect(err.message).to.contain('UNIQ_QCER');
	    		done();
	    	});
	    });

	    it('Cannot insert duplicate SUBJECT', function(done) {
	    	var queryString = 'insert into subject set ?';
	    	var jsonData = {"name": "Topic 5"};
	    	Dao.insertOrUpdateRecord(queryString, jsonData, function(err, insertedId) {
	    		expect(insertedId).to.be.undefined;
	    		expect(err).not.to.be.null;
	    		expect(err.message).to.contain('UNIQ_SUBJECT');
	    		done();
	    	});
	    });

	    it('Cannot insert duplicate OBJECTIVE', function(done) {
	    	var queryString = 'insert into objective set ?';
	    	var jsonData = {"descr": "Objective 6"};
	    	Dao.insertOrUpdateRecord(queryString, jsonData, function(err, insertedId) {
	    		expect(insertedId).to.be.undefined;
	    		expect(err).not.to.be.null;
	    		expect(err.message).to.contain('UNIQ_OBJECTIVE');
	    		done();
	    	});
	    });

    });


});	