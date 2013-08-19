var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , when   = require('when')
    , LearningDesignCtrl = require('../../controllers/learningDesign')
    , LearningDesignDao = require('../../dao/LdDao')
    , LearningDesignService = require('../../service/LDService')
    , messages = require('../../service/ValidationMessages');

//FIXME make the tests work with promises!
describe('Learning Design Controller', function() {

    var req = {}
        , res = {}
        , sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('find by id', function() {

    	it('Returns a 500 when unexpected error occurs getting learning design from dao', function(done) {

    		var learningDesignId = 956;
    		req.params = {id: learningDesignId};

            var serviceError = new Error("something went wrong");
            var serviceStub = sandbox.stub(LearningDesignService, 'getLearningDesignPromise').
                returns(when.reject(serviceError));

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceError.message);
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
                done();
            };

            LearningDesignCtrl.findById(req, res);
    	});

    	it('Returns a 404 when learning design not found', function(done) {

    		var learningDesignId = 956;
    		req.params = {id: learningDesignId};

            var serviceResponse = [
                    [],
                    [],
                    []
                ]
            var serviceStub = sandbox.stub(LearningDesignService, 'getLearningDesignPromise').
                returns(when(serviceResponse).then(function(results) {
                    done(); 
                }));

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(404);
                expect(errMessage).to.equal(notFoundMessage);
                
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
                done();
            };

            LearningDesignCtrl.findById(req, res);
    	});

    	it('Returns a 200 when learning design is found', function(done) {
    		var learningDesignId = 956;
    		req.params = {id: learningDesignId};

            var serviceResponse = [
                    [{"ld_id":1,"ld_name":"Learning Design Title Demo 1"}],
                    [{"subject_name":"Topic 1"},{"subject_name":"Topic 5"}],
                    [{"objective_descr":"Objective 1"},{"objective_descr":"Objective 6"}]
                ]
            var serviceStub = sandbox.stub(LearningDesignService, 'getLearningDesignPromise').
                returns(when(serviceResponse).then(function(results) {
                    done(); 
                }));

            res.json = function(httpStatus, result) {
            	expect(httpStatus).to.equal(200);
                expect(results).to.have.length(3);
            	expect(result[0][0].ld_id).to.equal(1);
            	expect(result[0][0].ld_name).to.equal('Learning Design Title Demo 1');
                expect(result[1][0].subject_name).to.equal('Topic 1');
                expect(result[1][1].subject_name).to.equal('Topic 5');
                expect(result[2][0].objective_descr).to.equal('Objective 1');
                expect(result[2][1].objective_descr).to.equal('Objective 6');

            	assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
            	done();
            }

            LearningDesignCtrl.findById(req, res);
    	});

    });

    describe('find all', function() {

    	it('Returns a 500 when unexpected error occurs getting learning designs from dao', function(done) {

    		var daoError = new Error("something went wrong");
    		var daoStub = sandbox.stub(LearningDesignDao, "getLearningDesigns", function(callback) {
                callback(daoError);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(daoError.message);
                
                assert.isTrue(daoStub.calledOnce);
                done();
            };

            LearningDesignCtrl.index(req, res);
    	});

    	it('Returns a 200 when learning designs are retrieved successfully', function(done) {

    		var ldResults = [{ld_id: 1, ld_name: "Demo 1"}, {ld_id: 2, ld_name: "Demo 2"}];
    		var daoStub = sandbox.stub(LearningDesignDao, "getLearningDesigns", function(callback) {
                callback(null, ldResults);
            });

            res.json = function(httpStatus, results) {
                expect(httpStatus).to.equal(200);
                expect(results.length).to.equal(ldResults.length);
                expect(results).to.equal(ldResults);
                
                assert.isTrue(daoStub.calledOnce);
                done();
            };

            LearningDesignCtrl.index(req, res);
    	});
    });

});    