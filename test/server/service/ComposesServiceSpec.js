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
            var ldId = 9;
            var source = new SourceBuilder().build();
			var target = new TargetBuilder().build();

			var daoError = new Error('something went wrong in dao');
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(daoError);
            });
            var helperGetRecordStub = sandbox.stub(composesHelper, "getComposesRecord");
            var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath");
            var helperMoveStub = sandbox.stub(composesHelper, "moveNodes");
            var helperValidateStub = sandbox.stub(composesHelper, "validateNodes");
			var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti");
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure");
			
			var serviceCB = function(err, result, message) {
				expect(err).to.equal(daoError);
				expect(result).to.be.null;
				expect(message).to.equal(messages.DRAG_DROP_FAIL);
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.equal(helperGetRecordStub.callCount, 0);
				assert.equal(helperGetPathStub.callCount, 0);
				assert.equal(helperMoveStub.callCount, 0);
				assert.equal(helperValidateStub.callCount, 0);
				assert.equal(daoUpdateStub.callCount, 0);
				assert.equal(activityServiceStub.callCount, 0);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

		it('Calls back with error if dao returns empty list', function(done) {
            var ldId = 9;
            var source = new SourceBuilder().build();
			var target = new TargetBuilder().build();

			var daoResults = [];
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(null, daoResults);
            });
            var helperGetRecordStub = sandbox.stub(composesHelper, "getComposesRecord");
            var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath");
            var helperMoveStub = sandbox.stub(composesHelper, "moveNodes");
            var helperValidateStub = sandbox.stub(composesHelper, "validateNodes");
            var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti");
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure");

			var serviceCB = function(err, result, message) {
				expect(err).not.to.be.null;
				expect(result).to.be.null;
				expect(message).to.equal(messages.DRAG_DROP_FAIL);
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.equal(helperGetRecordStub.callCount, 0);
				assert.equal(helperGetPathStub.callCount, 0);
				assert.equal(helperMoveStub.callCount, 0);
				assert.equal(helperValidateStub.callCount, 0);
				assert.equal(daoUpdateStub.callCount, 0);
				assert.equal(activityServiceStub.callCount, 0);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

		it('Calls back with error if Drag Source not found in Composes results', function(done) {
			var ldId = 9;
            var source = new SourceBuilder()
            	.withNodeId(999).withNodeType('ACTIVITY').withLevel(3).withPosition(1).build();
			var target = new TargetBuilder()
				.withNodeId(28).withNodeType('ACTIVITY').withLevel(3).withPosition(1).withMove('top').build();

			var l3P1 = {"id":19,"ld_id":ldId,"activity_id":28,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
			var l4P2 = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":4,"position":2};
			var l5P3 = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":5,"position":3};
			var daoResults = [l3P1, l4P2, l5P3];
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(null, daoResults);
            });
            
            var helperGetRecordsStub = sandbox.stub(composesHelper, "getComposesRecord");
            helperGetRecordsStub.withArgs(daoResults, source.nodeId, source.nodeType, source.level, source.position)
            	.returns(null);
            helperGetRecordsStub.withArgs(daoResults, target.nodeId, target.nodeType, target.level, target.position)
            	.returns(l3P1);

           	var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath");
            var helperMoveStub = sandbox.stub(composesHelper, "moveNodes");
            var helperValidateStub = sandbox.stub(composesHelper, "validateNodes");
            var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti");
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure");

            var serviceCB = function(err, result, message) {
				expect(err).not.to.be.null;
				expect(result).to.be.null;
				expect(message).to.equal(messages.DRAG_DROP_FAIL);
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, source.nodeId, source.nodeType, source.level, source.position).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, target.nodeId, target.nodeType, target.level, target.position).calledOnce);
				assert.equal(helperGetPathStub.callCount, 0);
				assert.equal(helperMoveStub.callCount, 0);
				assert.equal(helperValidateStub.callCount, 0);
				assert.equal(daoUpdateStub.callCount, 0);
				assert.equal(activityServiceStub.callCount, 0);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

		it('Calls back with error if Drop Target not found in Composes results', function(done) {
			var ldId = 9;
            var source = new SourceBuilder()
            	.withNodeId(20).withNodeType('ACTIVITY').withLevel(4).withPosition(2).build();
			var target = new TargetBuilder()
				.withNodeId(999).withNodeType('ACTIVITY').withLevel(3).withPosition(1).withMove('top').build();

			var l3P1 = {"id":19,"ld_id":ldId,"activity_id":28,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
			var l4P2 = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":4,"position":2};
			var l5P3 = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":5,"position":3};
			var daoResults = [l3P1, l4P2, l5P3];
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(null, daoResults);
            });
            
            var helperGetRecordsStub = sandbox.stub(composesHelper, "getComposesRecord");
            helperGetRecordsStub.withArgs(daoResults, source.nodeId, source.nodeType, source.level, source.position)
            	.returns(l4P2);
            helperGetRecordsStub.withArgs(daoResults, target.nodeId, target.nodeType, target.level, target.position)
            	.returns(null);

           	var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath");
            var helperMoveStub = sandbox.stub(composesHelper, "moveNodes");
            var helperValidateStub = sandbox.stub(composesHelper, "validateNodes");
            var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti");
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure");

            var serviceCB = function(err, result, message) {
				expect(err).not.to.be.null;
				expect(result).to.be.null;
				expect(message).to.equal(messages.DRAG_DROP_FAIL);
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, source.nodeId, source.nodeType, source.level, source.position).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, target.nodeId, target.nodeType, target.level, target.position).calledOnce);
				assert.equal(helperGetPathStub.callCount, 0);
				assert.equal(helperMoveStub.callCount, 0);
				assert.equal(helperValidateStub.callCount, 0);
				assert.equal(daoUpdateStub.callCount, 0);
				assert.equal(activityServiceStub.callCount, 0);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

		it('Calls back with error if move is invalid', function(done) {
			var ldId = 9;
            var source = new SourceBuilder()
            	.withNodeId(19).withNodeType('ACTIVITY').withLevel(3).withPosition(1).build();
			var target = new TargetBuilder()
				.withNodeId(20).withNodeType('ACTIVITY').withLevel(4).withPosition(2).withMove('top').build();

			var l3P1 = {"id":19,"ld_id":ldId,"activity_id":28,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
			var l4P2 = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":4,"position":2};
			var l5P3 = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":5,"position":3};
			var daoResults = [l3P1, l4P2, l5P3];
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(null, daoResults);
            });
            
            var helperGetRecordsStub = sandbox.stub(composesHelper, "getComposesRecord");
            var sourceRecord = l3P1;
            var targetRecord = l4P2;
            helperGetRecordsStub.withArgs(daoResults, source.nodeId, source.nodeType, source.level, source.position)
            	.returns(sourceRecord);
            helperGetRecordsStub.withArgs(daoResults, target.nodeId, target.nodeType, target.level, target.position)
            	.returns(targetRecord);

            var pathResult = [l4P2, l5P3];
    		var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath").returns(pathResult);

    		var l4P2Inc = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":5,"position":2};
			var l5P3Inc = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":6,"position":3};
			var movedNodeResults = [l4P2Inc, l5P3Inc];
			var helperMoveStub = sandbox.stub(composesHelper, "moveNodes").returns(movedNodeResults);

			var helperValidateStub = sandbox.stub(composesHelper, "validateNodes").returns(false);
            var validationMatcher = sinon.match(function(value) {
				return value.length === 3 && 
					value[0] === movedNodeResults[0] &&
					value[1] === movedNodeResults[1] &&
					value[2].id === sourceRecord.id &&
					value[2].level === targetRecord.level &&
					value[2].position === targetRecord.position; 
			});

			var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti");
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure");

            var serviceCB = function(err, result, message) {
				expect(err).not.to.be.null;
				expect(result).to.be.null;
				expect(message).to.equal(messages.DRAG_DROP_INVALID);
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, source.nodeId, source.nodeType, source.level, source.position).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, target.nodeId, target.nodeType, target.level, target.position).calledOnce);
				assert.isTrue(helperGetPathStub.withArgs(
					target.move, daoResults, target.level, target.position, l3P1.id).calledOnce);
				assert.isTrue(helperMoveStub.withArgs(target.move, pathResult).calledOnce);
				assert.isTrue(helperValidateStub.withArgs(validationMatcher).calledOnce);
				assert.equal(daoUpdateStub.callCount, 0);
				assert.equal(activityServiceStub.callCount, 0);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

		it('Calls back with error if dao to update structure returns error', function(done) {
			var ldId = 9;
            var source = new SourceBuilder()
            	.withNodeId(19).withNodeType('ACTIVITY').withLevel(3).withPosition(1).build();
			var target = new TargetBuilder()
				.withNodeId(20).withNodeType('ACTIVITY').withLevel(4).withPosition(2).withMove('top').build();

			var l3P1 = {"id":19,"ld_id":ldId,"activity_id":28,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
			var l4P2 = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":4,"position":2};
			var l5P3 = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":5,"position":3};
			var daoResults = [l3P1, l4P2, l5P3];
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(null, daoResults);
            });
            
            var helperGetRecordsStub = sandbox.stub(composesHelper, "getComposesRecord");
            var sourceRecord = l3P1;
            var targetRecord = l4P2;
            helperGetRecordsStub.withArgs(daoResults, source.nodeId, source.nodeType, source.level, source.position)
            	.returns(sourceRecord);
            helperGetRecordsStub.withArgs(daoResults, target.nodeId, target.nodeType, target.level, target.position)
            	.returns(targetRecord);

            var pathResult = [l4P2, l5P3];
    		var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath").returns(pathResult);

    		var l4P2Inc = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":5,"position":2};
			var l5P3Inc = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":6,"position":3};
			var movedNodeResults = [l4P2Inc, l5P3Inc];
			var helperMoveStub = sandbox.stub(composesHelper, "moveNodes").returns(movedNodeResults);

			var helperValidateStub = sandbox.stub(composesHelper, "validateNodes").returns(true);
            var validationMatcher = sinon.match(function(value) {
				return value.length === 3 && 
					value[0] === movedNodeResults[0] &&
					value[1] === movedNodeResults[1] &&
					value[2].id === sourceRecord.id &&
					value[2].level === targetRecord.level &&
					value[2].position === targetRecord.position; 
			});

			var daoUpdateError = new Error('something went wrong updating composes');
			var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti", function(criteria, callback) {
                callback(daoUpdateError);
            });
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure");

            var serviceCB = function(err, result, message) {
				expect(err).to.be.daoUpdateError;
				expect(result).to.be.null;
				expect(message).to.equal(messages.DRAG_DROP_FAIL);
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, source.nodeId, source.nodeType, source.level, source.position).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, target.nodeId, target.nodeType, target.level, target.position).calledOnce);
				assert.isTrue(helperGetPathStub.withArgs(
					target.move, daoResults, target.level, target.position, l3P1.id).calledOnce);
				assert.isTrue(helperMoveStub.withArgs(target.move, pathResult).calledOnce);
				assert.isTrue(helperValidateStub.withArgs(validationMatcher).calledOnce);
				assert.isTrue(daoUpdateStub.withArgs(validationMatcher).calledOnce);
				assert.equal(activityServiceStub.callCount, 0);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

		it('Calls back with error if unable to fetch activity structure after update', function(done) {
			var ldId = 9;
            var source = new SourceBuilder()
            	.withNodeId(19).withNodeType('ACTIVITY').withLevel(3).withPosition(1).build();
			var target = new TargetBuilder()
				.withNodeId(20).withNodeType('ACTIVITY').withLevel(4).withPosition(2).withMove('top').build();

			var l3P1 = {"id":19,"ld_id":ldId,"activity_id":28,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
			var l4P2 = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":4,"position":2};
			var l5P3 = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":5,"position":3};
			var daoResults = [l3P1, l4P2, l5P3];
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(null, daoResults);
            });
            
            var helperGetRecordsStub = sandbox.stub(composesHelper, "getComposesRecord");
            var sourceRecord = l3P1;
            var targetRecord = l4P2;
            helperGetRecordsStub.withArgs(daoResults, source.nodeId, source.nodeType, source.level, source.position)
            	.returns(sourceRecord);
            helperGetRecordsStub.withArgs(daoResults, target.nodeId, target.nodeType, target.level, target.position)
            	.returns(targetRecord);

            var pathResult = [l4P2, l5P3];
    		var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath").returns(pathResult);

    		var l4P2Inc = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":5,"position":2};
			var l5P3Inc = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":6,"position":3};
			var movedNodeResults = [l4P2Inc, l5P3Inc];
			var helperMoveStub = sandbox.stub(composesHelper, "moveNodes").returns(movedNodeResults);

			var helperValidateStub = sandbox.stub(composesHelper, "validateNodes").returns(true);
            var validationMatcher = sinon.match(function(value) {
				return value.length === 3 && 
					value[0] === movedNodeResults[0] &&
					value[1] === movedNodeResults[1] &&
					value[2].id === sourceRecord.id &&
					value[2].level === targetRecord.level &&
					value[2].position === targetRecord.position; 
			});

			var daoUpdateResults = {};
			var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti", function(criteria, callback) {
                callback(null, daoUpdateResults);
            });
            
            var activityError = new Error('something went wrong retrieving activity structure');
            var activityMessage = 'Failed to get activity structure';
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure", function(ldId, callback) {
            	callback(activityError, null, activityMessage);
            });

            var serviceCB = function(err, result, message) {
				expect(err).to.be.activityError;
				expect(result).to.be.null;
				expect(message).to.equal(activityMessage);
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, source.nodeId, source.nodeType, source.level, source.position).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, target.nodeId, target.nodeType, target.level, target.position).calledOnce);
				assert.isTrue(helperGetPathStub.withArgs(
					target.move, daoResults, target.level, target.position, l3P1.id).calledOnce);
				assert.isTrue(helperMoveStub.withArgs(target.move, pathResult).calledOnce);
				assert.isTrue(helperValidateStub.withArgs(validationMatcher).calledOnce);
				assert.isTrue(daoUpdateStub.withArgs(validationMatcher).calledOnce);
				assert.isTrue(activityServiceStub.withArgs(ldId).calledOnce);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

		it('Calls back with activity structure when update is successful', function(done) {
			var ldId = 9;
            var source = new SourceBuilder()
            	.withNodeId(19).withNodeType('ACTIVITY').withLevel(3).withPosition(1).build();
			var target = new TargetBuilder()
				.withNodeId(20).withNodeType('ACTIVITY').withLevel(4).withPosition(2).withMove('top').build();

			var l3P1 = {"id":19,"ld_id":ldId,"activity_id":28,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
			var l4P2 = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":4,"position":2};
			var l5P3 = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":5,"position":3};
			var daoResults = [l3P1, l4P2, l5P3];
			var daoFindStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
                callback(null, daoResults);
            });
            
            var helperGetRecordsStub = sandbox.stub(composesHelper, "getComposesRecord");
            var sourceRecord = l3P1;
            var targetRecord = l4P2;
            helperGetRecordsStub.withArgs(daoResults, source.nodeId, source.nodeType, source.level, source.position)
            	.returns(sourceRecord);
            helperGetRecordsStub.withArgs(daoResults, target.nodeId, target.nodeType, target.level, target.position)
            	.returns(targetRecord);

            var pathResult = [l4P2, l5P3];
    		var helperGetPathStub = sandbox.stub(composesHelper, "getNodesInPath").returns(pathResult);

    		var l4P2Inc = {"id":20,"ld_id":ldId,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":5,"position":2};
			var l5P3Inc = {"id":21,"ld_id":ldId,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":6,"position":3};
			var movedNodeResults = [l4P2Inc, l5P3Inc];
			var helperMoveStub = sandbox.stub(composesHelper, "moveNodes").returns(movedNodeResults);

			var helperValidateStub = sandbox.stub(composesHelper, "validateNodes").returns(true);
            var validationMatcher = sinon.match(function(value) {
				return value.length === 3 && 
					value[0] === movedNodeResults[0] &&
					value[1] === movedNodeResults[1] &&
					value[2].id === sourceRecord.id &&
					value[2].level === targetRecord.level &&
					value[2].position === targetRecord.position; 
			});

			var daoUpdateResults = {};
			var daoUpdateStub = sandbox.stub(composesDao, "updateComposesMulti", function(criteria, callback) {
                callback(null, daoUpdateResults);
            });
            
            var activityResult = {structure: "nodes"};
            var activityServiceStub = sandbox.stub(activityService, "getEnrichedLDActivityStructure", function(ldId, callback) {
            	callback(null, activityResult);
            });

            var serviceCB = function(err, result, message) {
				expect(err).to.be.null
				expect(result).to.be.activityResult;
				expect(message).to.be.undefined
				
				assert.isTrue(daoFindStub.withArgs([ldId]).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, source.nodeId, source.nodeType, source.level, source.position).calledOnce);
				assert.isTrue(helperGetRecordsStub.withArgs(
					daoResults, target.nodeId, target.nodeType, target.level, target.position).calledOnce);
				assert.isTrue(helperGetPathStub.withArgs(
					target.move, daoResults, target.level, target.position, l3P1.id).calledOnce);
				assert.isTrue(helperMoveStub.withArgs(target.move, pathResult).calledOnce);
				assert.isTrue(helperValidateStub.withArgs(validationMatcher).calledOnce);
				assert.isTrue(daoUpdateStub.withArgs(validationMatcher).calledOnce);
				assert.isTrue(activityServiceStub.withArgs(ldId).calledOnce);
				done();
			};
			fixture.nodeToNode(ldId, source, target, serviceCB);
		});

	});

});