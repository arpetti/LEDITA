var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , LearningDesignCtrl = require('../../controllers/learningDesign')
    , LearningDesignDao = require('../../dao/LdDao')
    , LearningDesignService = require('../../service/LDService')
    , messages = require('../../service/ValidationMessages');

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
    		var serviceStub = sandbox.stub(LearningDesignService, "getLearningDesignDetail", function(ldid, callback) {
                callback(serviceError);
            });

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

            var notFoundMessage = 'ld not found';
    		var serviceStub = sandbox.stub(LearningDesignService, "getLearningDesignDetail", function(ldid, callback) {
                callback(null, notFoundMessage);
            });

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

    		var ldResult = [{ld_id: 956, ld_name: "Demo 956"}];
    		var daoStub = sandbox.stub(LearningDesignDao, "getLearningDesign", function(id, callback) {
                callback(null, ldResult);
            });

            res.json = function(httpStatus, result) {
            	expect(httpStatus).to.equal(200);
            	expect(result.ld_id).to.equal(ldResult[0].ld_id);
            	expect(result.ld_name).to.equal(ldResult[0].ld_name);

            	assert.isTrue(daoStub.withArgs(learningDesignId).calledOnce);
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