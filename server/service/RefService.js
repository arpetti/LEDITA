var RefDao = require('../dao/RefDao');
var messages = require('./ValidationMessages');

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
    getSubjectsMatching: function(partial, callback) {
    	RefDao.getSubjectsMatching(partial, function(err, results) {
    		if (err) {
    			callback(err, null, messages.UNABLE_TO_RETRIEVE_SUBJECTS);
    		} else {
    			callback(null, results, null);
    		}
    	});
    }

};