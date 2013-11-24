var composesDao = require('../dao/ComposesDao');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');
var helper = require('../util/MoveNodeHelper');
var activityService = require('./ActivityService');

module.exports = {

	// TODO: Add unit test
	// callback(err, result, message)
	nodeToNode: function(ldId, sourceId, targetId, callback) {
		composesDao.findAllComposes([ldId], function(err, results) {
			if(err){
				callback(err, null, messages.DRAG_DROP_FAIL);
			} else if (results.length === 0) {
				logger.log().warn('Drag Drop no composes records found for LD');
				callback(new Error('Drag Drop no composes records found for LD'), null, messages.DRAG_DROP_FAIL);
			} else {
				var nodesMoved = helper.moveNode(sourceId, targetId, results);
				module.exports.updateStructure(nodesMoved, ldId, function(err, result, message) {
					if(err) {
						callback(err, null, message);
					} else {
						callback(null, result);
					}
				});
			}
		});
	},

	// cb(err, result, message)
	updateStructure: function(nodes, ldId, cb) {
		composesDao.updateComposesMulti(nodes, function(err, results) {
			if(err) {
				logger.log().error('Drag Drop move was valid but unable to update composes', err);
				cb(err, null, messages.DRAG_DROP_FAIL);
			} else {
				activityService.getEnrichedLDActivityStructure(ldId, function(err, result, message) {
					if(err) {
						logger.log().error('Drag Drop updates completed successfully but unable to retrieve LD nodes', err);
						cb(err, null, message);
					} else {
						cb(null, result);
					}
				})
			}
		});
	}

};