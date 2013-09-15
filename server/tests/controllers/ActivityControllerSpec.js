var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , ActivityService = require('../../service/ActivityService')
    , ActivityCtrl = require('../../controllers/ActivityController');

describe('Activity Controller', function() {

    var req = { }
        , res = {}
        , sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('getLDNodes', function() {

    	it('Returns a 200 with results from Activity Service', function(done) {

    		var learningDesignId = 1213;
    		req.params = {id: learningDesignId};

    		var nodeResult = {"1": [], "2": []};
    		var serviceStub = sandbox.stub(ActivityService, "getEnrichedLDActivityStructure", function(ldid, callback) {
                callback(null, nodeResult, null);
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                expect(result).to.equal(nodeResult);
                
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
                done();
            };

            ActivityCtrl.getLDNodes(req, res);
    	});

    	it('Returns a 500 with message if Activity Service calls back with error', function(done) {

    		var learningDesignId = 956;
    		req.params = {id: learningDesignId};

    		var error = new Error("something went wrong");
    		var ldMessage = "Unable to retrieve ld nodes";
    		var serviceStub = sandbox.stub(ActivityService, "getEnrichedLDActivityStructure", function(ldid, callback) {
                callback(error, null, ldMessage);
            });

            res.send = function(httpStatus, message) {
                expect(httpStatus).to.equal(500);
                expect(message).to.equal(ldMessage);
                
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
                done();
            };

            ActivityCtrl.getLDNodes(req, res);
    	});

    	it('Returns a 404 with message if Activity Service calls back with no results', function(done) {

    		var learningDesignId = 865;
    		req.params = {id: learningDesignId};

    		var ldMessage = "This LD has no nodes";
    		var serviceStub = sandbox.stub(ActivityService, "getEnrichedLDActivityStructure", function(ldid, callback) {
                callback(null, null, ldMessage);
            });

            res.send = function(httpStatus, message) {
                expect(httpStatus).to.equal(404);
                expect(message).to.equal(ldMessage);
                
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
                done();
            };

            ActivityCtrl.getLDNodes(req, res);
    	});

    });

});    