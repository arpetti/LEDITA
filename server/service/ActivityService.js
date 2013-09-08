var ActivityDao = require('../dao/ActivityDao');
var messages = require('./ValidationMessages');
var _ = require('underscore');

_.groupByMulti = function (obj, values, context) {
    if (!values.length)
        return obj;
    var byFirst = _.groupBy(obj, values[0], context),
        rest = values.slice(1);
    for (var prop in byFirst) {
        byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
    return byFirst;
};

var extractActivityIds = function(ldnodes) {
	var topLevelActivityIds = _.pluck(_.where(_.flatten(_.values(ldnodes)), {type: 'ACTIVITY'}), 'node_id');
	var activityGroups = _.pluck(_.where(_.flatten(_.values(ldnodes)), {type: 'ACTIVITY_GROUP'}), 'children');
	var activityGroupValues =  _.map(activityGroups, function(element) {return _.flatten(_.values(element));} );
	var flatActGroups = _.flatten(activityGroupValues);
	var childLevelActivityIds = _.pluck(_.where(flatActGroups, {group_child_type: 'ACTIVITY'}), 'group_child_id');

	return _.union(topLevelActivityIds, childLevelActivityIds);
};

var addTechToActGroup = function(actGroupNode, refData) {
	var groupChildren = actGroupNode.children;
	var levels = _.keys(groupChildren);
	for (var i = 0; i < levels.length; i++) {
		var nodes = groupChildren[levels[i]];
		for (var k=0; k<nodes.length; k++) {
			var node = nodes[k];
			if (node.group_child_type == 'ACTIVITY') {
				node.technologies = refData[node.group_child_id];
			}
		}
	}
};

var addResourceToActGroup = function(actGroupNode, refData) {
	var groupChildren = actGroupNode.children;
	var levels = _.keys(groupChildren);
	for (var i = 0; i < levels.length; i++) {
		var nodes = groupChildren[levels[i]];
		for (var k=0; k<nodes.length; k++) {
			var node = nodes[k];
			if (node.group_child_type == 'ACTIVITY') {
				node.resources = refData[node.group_child_id];
			}
		}
	}
};

module.exports = {

	// callback(err, result, message)
	getLDActivityStructure: function(ldid, callback) {
		ActivityDao.getLdNodes(ldid, function(err, ldNodeResults) {
			if (err) {
				callback(err, null, messages.UNABLE_TO_RETRIEVE_LD_NODES);
				return;
			}
			if (ldNodeResults.length === 0) {
				callback(null, null, messages.NO_LD_NODES_FOUND);
				return;
			}
			
			var activityGroupIds = _.pluck(_.where(ldNodeResults, {type: "ACTIVITY_GROUP"}), 'node_id');
			if (activityGroupIds.length === 0) {
				callback(null, _.groupBy(ldNodeResults, function(result){ return result.level; }), null);
				return;
			}
			
			ActivityDao.getGroups(activityGroupIds, function(err, activityGroupResults) {
				if (err) {
					callback(err, null, messages.UNABLE_TO_RETRIEVE_ACTIVITIES);
					return;
				}
				if (activityGroupResults.length === 0) {
					callback(null, null, messages.NO_ACTIVITIES_FOUND);
					return;
				}
				
				var groupsById = _.groupBy(activityGroupResults, function(element){return element.group_id});
				var groupsByIdThenLevel = _.groupByMulti(activityGroupResults, ['group_id', 'level']);

				var enrichLdNodes = _.map(ldNodeResults, function(element) {
					if (element.type === 'ACTIVITY_GROUP') {
						if (groupsById[element.node_id]) {  // check for empty group
							element.max_position = groupsById[element.node_id][0].max_position;
						}
						element.children = groupsByIdThenLevel[element.node_id];
						return element;
					} else {
						return element;
					}
				});

				var ldNodesByLevel = _.groupBy(enrichLdNodes, function(result){ return result.level; });
				callback(null, ldNodesByLevel, null);
			});
		});
	},

	// callback(err, result, message)
	getEnrichedLDActivityStructure: function(ldid, callback) {
		module.exports.getLDActivityStructure(ldid, function(err, ldnodes, message) {
			if (err || message) {
				callback(err, null, message);
				return;
			}
			var activityIds = extractActivityIds(ldnodes);
			// TODO Implement extractLdIds
			// var ldIds = extractLdIds(ldnodes); 
			ActivityDao.getActivityDetails(activityIds, null, function(err, activityDetails) {
				if (!err) {
					var techByActivityId = _.groupBy(activityDetails.technology, function(element) {return element.activity_id});
					var resourceByActivityId = _.groupBy(activityDetails.resource, function(element) {return element.activity_id});
					//TODO var qcerByLdId = _.groupBy(activityDetails.qcer, function(element) {return element.ld_id});
					var levels = _.keys(ldnodes);
					for (var i = 0; i < levels.length; i++) {
  						var nodes = ldnodes[levels[i]];
  						for (var k=0; k<nodes.length; k++) {
  							var node = nodes[k];
  							/*
  							// TODO
  							if (node.type == 'LD') {
								node.qcers = qcerByLdId[node.node_id];
  							}
  							*/
  							if (node.type == 'ACTIVITY') {
  								node.technologies = techByActivityId[node.node_id];
  								node.resources = resourceByActivityId[node.node_id];
  							}
  							if (node.type == 'ACTIVITY_GROUP') {
  								addTechToActGroup(node, techByActivityId);
  								addResourceToActGroup(node, resourceByActivityId);
  								//TODO addQcerToActGroup(node, qcerByLdId);
  							}
  						}
					}
					callback(null, ldnodes, null);
				}
			});
		});
	}

};