var LdCreateDao = require('../dao/LdCreateDao');

// #28 wip - refactoring Qcer handling out of LdCreateService and into common module here,
//           so that it can be re-used for LD Edit Update Qcers
module.exports = {

	/**
	 * Populates classificates to relate an LD to Qcers.
	 * Does nothing if all qcers are set to false.
	 * @param {number} ldId, ID of the Learning Design for which classificates will be inserted 
	 * @param {object} qcers, for example: {"1":true,"2":true}
	 * @param {object} options, for example: {"editMode": true}
	 */
	attachQcers: function(ldId, qcers, options, callback) {
		async.series([
			// Step 1: Delete all existing classificates for ldId - ONLY if edit mode is true
			function(callback){
			    callback(null, null);
		    },
		    // Step 2: Bulk insert new classificates (if any)
			function(callback){
			    var qcersToAttach = buildClassificates(ldid, getSelectedQcers(ldData));
            	if (qcersToAttach.length > 0) {
	            	LdCreateDao.insertClassificates(qcersToAttach, function(err, results) {
	            		if (err) {
	            			callback(err);
	            		} else {
	            			callback(null, null);
	            		}
	            	})
            	} else {
            		callback(null, null);
            	}
		    },
		    // Step 3: Update LD last_edit_date (waiting on Alessandro if this is necessary) - ONLY if edit mode is true
			function(callback){
			    callback(null, null);
		    }
		],
		function(err, results ) {
			// TODO check for err
		    callback();
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
	};

};