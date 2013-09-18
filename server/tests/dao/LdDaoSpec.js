var expect = require('chai').expect
    , LdDao = require('../../dao/LdDao');

describe('Learning Design DAO', function() {    

	it('Get all learning designs returns 30 results', function(done) {
		LdDao.getLearningDesigns(function(err, learningDesigns){
			expect(learningDesigns).to.have.length(30);
            done();
		});
    });

    it('First learning design found is LD Demo 1, created by user Mario Rossi', function(done) {
        LdDao.getLearningDesigns(function(err, learningDesigns){
            expect(learningDesigns[0].ld_id).to.equal(1);
            expect(learningDesigns[0].ld_name).to.equal('Learningà Designè Titleì Demoò 1ù é');
            expect(learningDesigns[0].ld_scope).to.equal('Lesson');
            expect(learningDesigns[0].user_name).to.equal('Mario');
            expect(learningDesigns[0].user_last_name).to.equal('Rossi');
            done();
        });
    });

    it('Get learning design by id 1 is LD Demo 1, created by user Mario Rossi', function(done) {
        var learningDesignId = 1;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(1);
            expect(learningDesigns[0].ld_id).to.equal(1);
            expect(learningDesigns[0].ld_name).to.equal('Learningà Designè Titleì Demoò 1ù é');
            expect(learningDesigns[0].ld_scope).to.equal('Lesson');
            expect(learningDesigns[0].ld_students_profile).to.equal('20 studenti adolescenti di livello B1');
            expect(learningDesigns[0].user_name).to.equal('Mario');
            expect(learningDesigns[0].user_last_name).to.equal('Rossi');
            expect(learningDesigns[0].ld_creation_date).not.to.be.null;
            expect(learningDesigns[0].ld_last_edit_date).not.to.be.null;
            done();
        });
    });

    it('Get learning design for id that is not found returns no results', function(done) {
        var learningDesignId = 99999;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(0);
            done();
        });
    });

    it('Get learning design for null id returns no results', function(done) {
        var learningDesignId = null;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(0);
            done();
        });
    });

    it('Get learning design for undefined id returns no results', function(done) {
        var learningDesignId;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(0);
            done();
        });
    });

    describe('Subjects', function() {

        it('Get learning design subjects returns results', function(done) {
            var learningDesignId = 1;
            LdDao.getLearningDesignSubjects(learningDesignId, function(err, results){
                expect(results).to.have.length(2);
                expect(results[0].subject_name).to.equal('Topic 1');
                expect(results[1].subject_name).to.equal('Topic 5');
                done();
            });
        });

        it('Get learning design subjects returns no results when LD has no subjects', function(done) {
            // All LD's have subjects, therefore only way to test this is with non existing LD ID
            var learningDesignId = 999;
            LdDao.getLearningDesignSubjects(learningDesignId, function(err, results){
                expect(results).to.have.length(0);
                done();
            });
        });

    });

    describe('Objectives', function() {

        it('Get learning design objectives returns results', function(done) {
            var learningDesignId = 3;
            LdDao.getLearningDesignObjectives(learningDesignId, function(err, results){
                expect(results).to.have.length(2);
                expect(results[0].objective_descr).to.equal('Objective 3');
                expect(results[1].objective_descr).to.equal('Objective 6');
                done();
            });
        });

        it('Get learning design objectives returns no results when LD has no objectives', function(done) {
            // All LD's have objectives, therefore only way to test this is with non existing LD ID
            var learningDesignId = 999;
            LdDao.getLearningDesignObjectives(learningDesignId, function(err, results){
                expect(results).to.have.length(0);
                done();
            });
        });

    });

    describe('Prerequisites', function() {

        it('Get learning design prerequisites returns OBJECTIVE types', function(done) {
            var learningDesignId = 1;
            LdDao.getPrerequisites(learningDesignId, function(err, results){
                expect(results).to.have.length(2);
                expect(results[0].prereq_name).to.equal('Objective 1');
                expect(results[0].prereq_type).to.equal('OBJECTIVE');
                expect(results[1].prereq_name).to.equal('Objective 2');
                expect(results[1].prereq_type).to.equal('OBJECTIVE');
                done();
            });
        });

        it('Get learning design prerequisites returns OBJECTIVE and LD types', function(done) {
            var learningDesignId = 8;
            LdDao.getPrerequisites(learningDesignId, function(err, results){
                expect(results).to.have.length(2);
                expect(results[0].prereq_name).to.equal('Learning Design Title Demo 2');
                expect(results[0].prereq_type).to.equal('LD');
                expect(results[1].prereq_name).to.equal('Objective 6');
                expect(results[1].prereq_type).to.equal('OBJECTIVE');
                done();
            });
        });

        it('Get learning design prerequisites returns no results when LD has no prerequisites', function(done) {
            var learningDesignId = 10;
            LdDao.getPrerequisites(learningDesignId, function(err, results){
                expect(results).to.have.length(0);
                done();
            });
        });

    });

    describe('Qcers', function() {

        it('Gets learning design qcers returns results', function(done) {
            var learningDesignId = 1;
            LdDao.getQcers(learningDesignId, function(err, results) {
                expect(err).to.be.null;
                expect(results).to.have.length(2);
                expect(results[0].qcer_name).to.equal('A1');
                expect(results[1].qcer_name).to.equal('A2');
                done();
            });
        });

        it('Gets learning design qcers returns empty list when LD has no qcers', function(done) {
            var learningDesignId = 7;
            LdDao.getQcers(learningDesignId, function(err, results) {
                expect(err).to.be.null;
                expect(results).to.have.length(0);
                done();
            });
        });

        it('Gets qcers with learning design ids', function(done) {
            var ldids = [17, 18];
            LdDao.getQcersWithLdId(ldids, function(err, results) {
                expect(err).to.be.null;
                expect(results).to.have.length(2);
                expect(results[0].ld_id).to.equal(17);
                expect(results[0].qcer_name).to.equal('C1');
                expect(results[1].ld_id).to.equal(18);
                expect(results[1].qcer_name).to.equal('A1');
                done();
            });
        });

    });

});	