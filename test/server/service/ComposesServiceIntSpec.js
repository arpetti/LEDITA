var expect = require('chai').expect;
var fixture = require('../../../server/service/ComposesService');

var SourceBuilder = function() {
	var nodeId = 1;
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

describe('Composes Service Integration', function() {

	it('Retrieves composes data', function(done) {
		//nodeToNode: function(ldId, source, target, callback) {
		var ldId = 1;
		var source = new SourceBuilder().build();
		var target = new TargetBuilder().build();
		fixture.nodeToNode(ldId, source, target, function(err, results, message) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			done();
		});
	});

});