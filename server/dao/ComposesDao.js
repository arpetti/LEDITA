var mysql = require('mysql')
var dao = require('./Dao.js');
var logger = require('../util/LogWrapper');

var FIND_ALL_COMPOSES = 'SELECT id, ld_id, activity_id, ld_part_id, activity_group_id, level, position FROM composes where ld_id = ? ORDER BY level, position';
var UPDATE_COMPOSES = 'UPDATE composes set level = ?, position = ? WHERE id = ?';

// TODO: Same method in LdEditDao, refactor to Dao.js to make it common
var handleResult = function(cb, err, result) {
	if(err) {
		cb(err);
	} else {
		cb(null, result);
	}
};

module.exports = {

	findAllComposes: function(criteria, callback) {
		dao.findAll(FIND_ALL_COMPOSES, criteria, function(err, result) {
			handleResult(callback, err, result);
		});
	},

	updateComposesMulti: function(nodes, callback) {
		var composeInputs = module.exports.generateComposeUpdates(nodes);
		dao.multiStatement(composeInputs.concatStatement, composeInputs.params, function(err, results) {
			handleResult(callback, err, results);
		});
	},

	generateComposeUpdates: function(nodes) {
		var statementArray = [];
		var paramArray = [];
        for (var i=0; i<nodes.length; i++) {
            statementArray.push(UPDATE_COMPOSES);
            paramArray.push(nodes[i].level);
            paramArray.push(nodes[i].position);
            paramArray.push(nodes[i].id);
        };
        var statements = statementArray.join("; ");
        var result = {
        	concatStatement: statements,
        	params: paramArray
        };
        return result;
	}

}