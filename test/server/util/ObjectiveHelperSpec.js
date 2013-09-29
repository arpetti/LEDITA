var expect = require('chai').expect
var ObjectiveHelper = require('../../../server/util/ObjectiveHelper');

describe('Objective Helper', function() {

	describe('Generate Relationship Records', function() {

		it('Creates objectId-ldId records', function() {
			var ldId = 9;
			var existingObjectives = [{"id":1,"descr":"Objective 1"},{"id":2,"descr":"Objective 2"}];
			var results = ObjectiveHelper.generateRelationshipRecords(existingObjectives, ldId);

			expect(results).to.have.length(2);
			expect(results[0][0]).to.equal(existingObjectives[0].id);
			expect(results[0][1]).to.equal(ldId);
			expect(results[1][0]).to.equal(existingObjectives[1].id);
			expect(results[1][1]).to.equal(ldId);
		});

		it('Returns an empty list if existingObjectives is empty', function() {
			var ldId = 9;
			var existingObjectives = [];
			var results = ObjectiveHelper.generateRelationshipRecords(existingObjectives, ldId);
			expect(results).to.have.length(0);
		});

	});

	describe('Extract New Objectives', function() {

		it('Returns list of objective names not in existing list', function() {
			var objectiveNames = ["Objective 1", "Objective 96", "Objective 3"];
			var existingObjectives = [{"id": 1, "descr": "Objective 1"}, {"id": 2,"descr": "Objective 2"}];
			var results = ObjectiveHelper.extractNewObjectives(objectiveNames, existingObjectives);

			expect(results).to.have.length(2);
			expect(results[0]).to.equal("Objective 96");
			expect(results[1]).to.equal("Objective 3");
		});

		it('Returns entire list of objective names when existing list is empty', function() {
			var objectiveNames = ["Objective 1", "Objective 96", "Objective 3"];
			var existingObjectives = [];
			var results = ObjectiveHelper.extractNewObjectives(objectiveNames, existingObjectives);

			expect(results).to.have.length(3);
			expect(results[0]).to.equal("Objective 1");
			expect(results[1]).to.equal("Objective 96");
			expect(results[2]).to.equal("Objective 3");
		});

		it('Returns empty list when all objective names are found in existing list', function() {
			var objectiveNames = ["Objective 1", "Objective 96", "Objective 3"];
			var existingObjectives = [
				{"id": 1, "descr": "Objective 1"},
				{"id": 3,"descr": "Objective 3"},
				{"id": 96,"descr": "Objective 96"}
			];
			var results = ObjectiveHelper.extractNewObjectives(objectiveNames, existingObjectives);
			expect(results).to.have.length(0);
		});

		it('Returns an empty list when both input lists are empty', function() {
			var objectiveNames = [];
			var existingObjectives = [];
			var results = ObjectiveHelper.extractNewObjectives(objectiveNames, existingObjectives);
			expect(results).to.have.length(0);
		});

	});

});