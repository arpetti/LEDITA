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
				var sourceRecord = ch.getComposesRecord(results, source.nodeId, source.nodeType, source.level, source.position);
				var targetRecord = ch.getComposesRecord(results, target.nodeId, target.nodeType, target.level, target.position);
				if (!sourceRecord || !targetRecord) {
					callback(err, null, messages.DRAG_DROP_FAIL);
					return;
				}
				
				var nodesToMove = ch.getNodesInPath(target.move, results, target.level, target.position, sourceRecord.id);
				var nodesMoved = ch.moveNodes(target.move, nodesToMove);

				sourceRecord.level = targetRecord.level;
				sourceRecord.position = targetRecord.position;
				nodesMoved.push(sourceRecord);

				logger.log().info('validating: ' + JSON.stringify(nodesMoved));
				var isValid = ch.validateNodes(nodesMoved);
				if (!isValid) {
					callback(err, null, messages.DRAG_DROP_FAIL);
					return;
				}

				// persist nodesMoved to db (async each?)
				// get fresh activity structure from db and return it
				callback(null, results, null); 
			}
		});
	}

};