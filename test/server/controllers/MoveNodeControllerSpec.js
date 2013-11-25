var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/controllers/MoveNodeController');
var MoveNodeValidator = require('../../../server/validate/MoveNodeValidator')
var MoveNodeService = require('../../../server/service/MoveNodeService');

describe('Move Node Controller', function() {

	describe('Node to Node', function() {

		var req = {};
	    var res = {};
	    var sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 with error message if validator returns error message', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var sourceId = '1-1-ACTIVITY-1';
    		var targetId = 'level-5';
    		req.body = {
    			dragSourceId: sourceId,
    			dropTargetId: targetId
    		};

    		var errorMessage = 'invalid move';
            var validateStub = sandbox.stub(MoveNodeValidator, "validateNodeToNode", function(ldId, sourceId, targetId, cb) {
            	cb(errorMessage);
            });

            var serviceStub = sandbox.stub(MoveNodeService, "nodeToNode");

            res.send = function(httpStatus, message) {
                expect(httpStatus).to.equal(400);
                expect(message).to.equal(errorMessage);
                assert.isTrue(validateStub.withArgs(ldId, sourceId, targetId).calledOnce);
                assert.equal(serviceStub.callCount, 0, "move is not executed when there are validation errors");
                done();
            };
            fixture.nodeToNode(req, res);
		});

	});

});