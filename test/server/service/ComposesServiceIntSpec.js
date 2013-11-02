var expect = require('chai').expect;
var fixture = require('../../../server/service/ComposesService');
var dao = require('../../../server/dao/Dao');
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

describe('Composes Service Integration', function() {

	var repeatStatement = function(statement, times) {
		var tempArray = [];
		for(var i=0; i<times; i++) {
			tempArray.push(statement);
		}
		return tempArray.join('; ');
	}

	var ldId = 1;
	var resetComposes = repeatStatement('UPDATE composes set level = ?, position = ? WHERE id = ?', 7);
	var resetParams = [1,1,1, 2,1,2, 3,1,3, 3,2,4, 4,1,5, 5,1,6, 6,1,7];
	var verifyComposes = 'select level, position from composes where ld_id = ? order by level, position';

	afterEach(function(done) {
		dao.multiStatement(resetComposes, resetParams, function(err, results) {
			expect(err).to.be.null;
			done();
		});
	});

	it('Updates composes structure when source node is dragged and dropped on target node', function(done) {
		var source = new SourceBuilder().build();
		var target = new TargetBuilder().build();
		var expectedComposes = [
			{"level":2,"position":1},
			{"level":3,"position":1},
			{"level":3,"position":2},
			{"level":4,"position":1},
			{"level":5,"position":1},
			{"level":6,"position":1},
			{"level":7,"position":1}
		];
		fixture.nodeToNode(ldId, source, target, function(err, results, message) {
			expect(err).to.be.null;
			expect(message).to.be.undefined;
			expect(results).not.to.be.null;
			dao.findAll(verifyComposes, [ldId], function(err, results) {
				expect(err).to.be.null;
				expect(JSON.stringify(results)).to.equal(JSON.stringify(expectedComposes));
				done();
			});
		});
	});

});