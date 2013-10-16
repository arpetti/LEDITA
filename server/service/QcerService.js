var LdCreateDao = require('../dao/LdCreateDao');
var LdEditDao = require('../dao/LdEditDao');
var LogWrapper = require('../util/LogWrapper');
var async = require('async');
var _ = require('underscore');

// #28 wip - refactoring Qcer handling out of LdCreateService and into common module here,
//           so that it can be re-used for LD Edit Update Qcers
module.exports = {

	/**
	 * Populates classificates to relate an LD to Qcers, by deleting existing, then inserting new.
	 * Does nothing if all qcers are set to false.
	 * @param {number} ldId, ID of the Learning Design for which classificates will be inserted 
	 * @param {object} qcers, for example: {"1":true, "2":true}
	 * @param {function} callback(err, results)
	 */
	attachQcers: function(ldId, qcers, callback) {
		async.waterfall([
			// Step 1: Determine if there's any work to do
			function(callback){
				var qcersToAttach = module.exports.buildClassificates(ldId, module.exports.getSelectedQcers(qcers));
				if (qcersToAttach.length > 0) {
					callback(null, qcersToAttach);
				} else {
					LogWrapper.log().warn('All qcers are false, will not delete or insert any.');
					callback(new Error('No qcers to attach'));
				}
			},
			// Step 2: Delete all existing classificates for ldId
			function(qcersToAttach, callback){
				LdEditDao.deleteClassificates(ldId, function(err, results) {
					if (err) {
						LogWrapper.log().error('Error occurred deleting classificates.', err);
            			callback(err);
            		} else {
            			callback(null, qcersToAttach);
            		}
				});
		    },
		    // Step 3: Insert new classificates
			function(qcersToAttach, callback){
            	LdCreateDao.insertClassificates(qcersToAttach, function(err, results) {
            		if (err) {
						LogWrapper.log().error('Error occurred inserting classificates.', err);
            			callback(err);
            		} else {
            			callback(null, 'done');
            		}
            	})
		    }
		],
		function(err, results) {
			callback(err); 
		});
	},

	getSelectedQcers: function(qcers) {
		var potentialQcers = qcers;
		var selectedQcers = [];
		for (var key in potentialQcers) {
			var value = potentialQcers[key];
			if(value === true) {
				selectedQcers.push(key);
			}
		};
		return _.map(selectedQcers, function(element) {return parseInt(element,10); });
	},

	buildClassificates: function(ldid, qcerIds) {
		return _.map(qcerIds, function(qcerId){ return [qcerId, ldid]; });
	}

};