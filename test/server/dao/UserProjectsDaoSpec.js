var expect = require('chai').expect;
var _ = require('underscore');
var fixture = require('../../../server/dao/UserProjectsDao');

describe('User Projects DAO', function() {

	var LD_PUBLIC = 1;
	var LD_PRIVATE = 0;

	var verifyProject = function(project, ldName, ldScope, ldPublication, ldQcers, userId) {
		expect(project.ld_name).to.equal(ldName);
		expect(project.ld_scope).to.equal(ldScope);
		expect(project.ld_publication).to.equal(ldPublication);
		expect(project.ld_qcers).to.equal(ldQcers);
		expect(project.user_id).to.equal(userId);
	};

	it('Gets public projects for user sorted by desceding creation date with qcers collapsed in a single row', function(done) {
		var userId = 1;
		fixture.getPublicProjects(userId, function(err, results) {
			expect(err).to.be.null;
			expect(results).to.have.length(4);

			verifyProject(results[0], 'Learningà Designè Titleì Demoò 1ù é', 'Lesson', LD_PUBLIC, 'A1 A2', userId);
			verifyProject(results[1], 'Learning Design Title Demo 9', 'Lesson', LD_PUBLIC, 'A1', userId);
			verifyProject(results[2], 'Learning Design Title Demo 17', 'Lesson', LD_PUBLIC, 'C1', userId);

			var sortedResults = _.sortBy(results, function(obj) {return obj.creation_date;});
			for(var i=0; i<results.length; i++) {
				expect(_.isEqual(results[i], sortedResults[i])).to.be.true;
			}

			done();
		});
	});

	it('Gets public and private projects for user sorted by desceding creation date with qcers collapsed in a single row', function(done) {
		var userId = 1;
		fixture.getPublicAndPrivateProjects(userId, function(err, results) {
			expect(err).to.be.null;
			expect(results).to.have.length(8);
			
			verifyProject(results[0], 'Learningà Designè Titleì Demoò 1ù é', 'Lesson', LD_PUBLIC, 'A1 A2', userId);
			verifyProject(results[1], 'Learning Design Title Demo 2', 'Module', LD_PRIVATE, 'B1', userId);
			verifyProject(results[2], 'Learning Design Title Demo 9', 'Lesson', LD_PUBLIC, 'A1', userId);
			verifyProject(results[3], 'Learning Design Title Demo 10', 'Module', LD_PRIVATE, 'A1', userId);
			verifyProject(results[4], 'Learning Design Title Demo 17', 'Lesson', LD_PUBLIC, 'C1', userId);
			verifyProject(results[5], 'Learning Design Title Demo 18', 'Module', LD_PRIVATE, 'A1', userId);
			verifyProject(results[6], 'Learning Design Title Demo 25', 'Lesson', LD_PUBLIC, 'A2 B2', userId);
			verifyProject(results[7], 'Learning Design Title Demo 26', 'Module', LD_PRIVATE, 'C2', userId);

			var sortedResults = _.sortBy(results, function(obj) {return obj.creation_date;});
			for(var i=0; i<results.length; i++) {
				expect(_.isEqual(results[i], sortedResults[i])).to.be.true;
			}

			done();
		});
	});

});