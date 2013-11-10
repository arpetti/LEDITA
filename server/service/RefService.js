var RefDao = require('../dao/RefDao');
var messages = require('../validate/ValidationMessages');
var _ = require('underscore');

module.exports = {

	// callback(err, result, message)
	getQcers: function(callback) {
		RefDao.getQcers(function(err, results) {
			if (err) {
				callback(err, null, messages.UNABLE_TO_RETRIEVE_QCERS);
				return;
			}
			if (results.length == 0) {
				callback(null, null, messages.QCERS_NOT_FOUND);
				return;
			} 
			callback(null, results, null);
		});
	},

	// callback(err, result, message)
    getScopesMatching: function(partial, callback) {
    	RefDao.getScopesMatching(partial, function(err, results) {
    		if (err) {
    			callback(err, null, messages.UNABLE_TO_RETRIEVE_SCOPES);
    		} else {
    			callback(null, _.pluck(results, "name") , null);
    		}
    	});
    },

    // callback(err, result, message)
    getSubjectsMatching: function(partial, callback) {
    	RefDao.getSubjectsMatching(partial, function(err, results) {
    		if (err) {
    			callback(err, null, messages.UNABLE_TO_RETRIEVE_SUBJECTS);
    		} else {
    			callback(null, _.pluck(results, "name") , null);
    		}
    	});
    },

    // callback(err, result, message)
    getObjectivesMatching: function(partial, callback) {
    	RefDao.getObjectivesMatching(partial, function(err, results) {
    		if (err) {
    			callback(err, null, messages.UNABLE_TO_RETRIEVE_OBJECTIVES);
    		} else {
    			callback(null, _.pluck(results, "descr") , null);
    		}
    	});
    },

    // callback(err, result, message)
    getTechnologiesMatching: function(partial, callback) {
    	RefDao.getTechnologiesMatching(partial, function(err, results) {
    		if (err) {
    			callback(err, null, messages.UNABLE_TO_RETRIEVE_TECHNOLOGIES);
    		} else {
    			callback(null, _.pluck(results, "name") , null);
    		}
    	});
    }

};