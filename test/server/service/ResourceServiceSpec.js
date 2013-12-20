var expect = require('chai').expect
var assert = require('chai').assert
var sinon = require('sinon')
var fixture = require('../../../server/service/ResourceService');
var dao = require('../../../server/dao/Dao');
var _ = require('underscore');

describe('Resource Service Integration', function() {
	
	it('Generates Resource Records', function() {
		var activityId = 1;
		var resources = [
			{name: "res1", type: "type1", descr: "descr 1", link: "http://res.1"},
			{name: "res2", type: "type2", descr: "descr 2", link: "http://res.2"}
		];
		
		var results = fixture.generateResourceRecords(activityId, resources);
		expect(results).to.have.length(resources.length);
		
		expect(results[0][0]).to.equal(activityId);
		expect(results[0][1]).to.equal(resources[0].name);
		expect(results[0][2]).to.equal(resources[0].type);
		expect(results[0][3]).to.equal(resources[0].descr);
		expect(results[0][4]).to.equal(resources[0].link);

		expect(results[1][0]).to.equal(activityId);
		expect(results[1][1]).to.equal(resources[1].name);
		expect(results[1][2]).to.equal(resources[1].type);
		expect(results[1][3]).to.equal(resources[1].descr);
		expect(results[1][4]).to.equal(resources[1].link);
	});

	it('Adds Resources', function(done) {
		var cleanupResource = 'delete from resource where activity_id = ?';
		var verifyResource = 'select id, activity_id, name, type, descr, link from resource where activity_id = ?';
		var activityId = 38; // known from demo data not to have any resources
		var resources = [
			{name: "res1", type: "type1", descr: "descr 1", link: "http://res.1"},
			{name: "res2", type: "type2", descr: "descr 2", link: "http://res.2"}
		];
		fixture.addResources(activityId, resources, function() {
			dao.findAll(verifyResource, [activityId], function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(resources.length);
				expect(results[0].id).to.be.above(40);
				expect(results[1].id).to.be.above(40);
				expect(_.contains(_.pluck(results, "name"), resources[0].name)).to.be.true;
				expect(_.contains(_.pluck(results, "name"), resources[1].name)).to.be.true;
				dao.deleteRecord(cleanupResource, [activityId], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			});
		});
	});

});