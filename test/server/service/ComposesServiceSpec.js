var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/service/ComposesService');
var composesHelper = require('../../../server/util/ComposesHelper');
var composesDao = require('../../../server/dao/ComposesDao');
var activityService = require('../../../server/service/ActivityService');
var messages = require('../../../server/validate/ValidationMessages');
var _ = require('underscore');

var SourceBuilder = function() {
	var nodeId = 5;
	var nodeType = 'ACTIVITY';
	var level = 1;
	var position = 1;

	return {
		withNodeId: function(anotherNodeId) {
			nodeId = anotherNodeId;
			return this;
		},
		withNodeType: function(anotherNodeType) {
			nodeType = anotherNodeType;
			return this;
		},
		withLevel: function(anotherLevel) {
			level = anotherLevel;
			return this;
		},
		withPosition: function(anotherPosition) {
			position = anotherPosition;
			return this;
		},
		build: function() {
			return {
				nodeId: nodeId,
				nodeType: nodeType,
				level: level,
				position: position
			};
		}
	};
};

var TargetBuilder = function() {
	var nodeId = 9;
	var nodeType = 'ACTIVITY';
	var level = 3;
	var position = 1;
	var move = 'top';

	return {
		withNodeId: function(anotherNodeId) {
			nodeId = anotherNodeId;
			return this;
		},
		withNodeType: function(anotherNodeType) {
			nodeType = anotherNodeType;
			return this;
		},
		withLevel: function(anotherLevel) {
			level = anotherLevel;
			return this;
		},
		withPosition: function(anotherPosition) {
			position = anotherPosition;
			return this;
		},
		withMove: function(anotherMove) {
			move = anotherMove;
			return this;
		},
		build: function() {
			return {
				nodeId: nodeId,
				nodeType: nodeType,
				level: level,
				position: position,
				move: move
			};
		}
	};
};

describe('Composes Service', function() {

	describe('Node to Node', function() {

		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
		    sandbox.restore();
		});

		it('Calls back with error if dao returns error', function(done) {
			
			var daoError = new Error('something went wrong in dao');
			var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(daoError);
            });

            var helperStub = sandbox.stub(composesHelper);
            var serviceStub = sandbox.stub(activityService);

            var ldId = 9;
            var source = new SourceBuilder().build();
			var target = new TargetBuilder().build();
			
			var serviceCB = function(err, result, message) {
				expect(err).to.equal(daoError);
				expect(result).to.be.null;
				expect(message).to.equal(messages.DRAG_DROP_FAIL);
				done();
			};

			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

	});

});