var composesDao = require('../dao/ComposesDao');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');
var ch = require('../util/ComposesHelper');

module.exports = {

	// #43 wip...
	// callback(err, result, message)
	nodeToNode: function(ldId, source, target, callback) {
		composesDao.findAllComposes([ldId], function(err, results) {
			if(err){
				callback(err, null, messages.DRAG_DROP_FAIL);
			} else if (results.length === 0) {
				callback(err, null, messages.DRAG_DROP_FAIL);
			} else {
				
				logger.log().info('results: ' + JSON.stringify(results));
				
				var sourceRecord = ch.getComposesRecord(results, source.nodeId, source.nodeType, source.level, source.position);
				logger.log().info('sourceRecord: ' + JSON.stringify(sourceRecord));
				
				var targetRecord = ch.getComposesRecord(results, target.nodeId, target.nodeType, target.level, target.position);
				logger.log().info('targetRecord: ' + JSON.stringify(targetRecord));
				
				if (!sourceRecord || !targetRecord) {
					callback(err, null, messages.DRAG_DROP_FAIL);
				}
				
				var nodesToMove = ch.getNodesInPath(target.move, results, target.level, target.position, sourceRecord.id);
				logger.log().info('nodesToMove: ' + JSON.stringify(nodesToMove));

				var nodesMoved = ch.moveNodes(target.move, nodesToMove);
				logger.log().info('nodesMoved: ' + JSON.stringify(nodesMoved));
				// Returns new list with node level/pos incremented/decremented according to target.move
				// var nodesMoved = ch.moveNodes(target.move, nodesToMove)

				// validate moves (pos must be between 1 and 4, level must be between 1 and 10)
				// var isValid = ch.validateMoves(nodesMoved) -> if not valid, callback with err/msg

				// append updated source to nodesMoved
				// sourceRecord.level = targetRecord.level;
				// sourceRecord.position = targetRecord.position;
				// logger.log().info('sourceRecord updated: ' + JSON.stringify(sourceRecord));

				// persist nodesMoved to db (async each?)
				// get fresh activity structure from db and return it
				callback(null, results, null); 
			}
		});
	}

};