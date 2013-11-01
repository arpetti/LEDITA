var composesDao = require('../dao/ComposesDao');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');
// var ch = require('../util/ComposesHelper');

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
				logger.log().info(JSON.stringify(results));
				callback(null, results, null); 
				// var sourceComposes = ch.findComposes(results, source.nodeId, source.type, source.level, source.position)
				// sourceComposes.level = target.level; sourceComposes.position = target.position
				// var nodesToMove = ch.findPath(results, target.move, target.pos, target.level)

				// Returns new list with node level/pos incremented/decremented according to target.move
				// var nodesMoved = ch.moveNodes(target.move, nodesToMove)

				// validate moves (pos must be between 1 and 4, level must be between 1 and 10)
				// var isValid = ch.validateMoves(nodesMoved) -> if not valid, callback with err/msg

				// append sourceComposes to nodesMoved
				// persist nodesMoved to db (async each?)
				// get fresh activity structure from db and return it
			}
		});
	}

};