var activityEditDao = require('../dao/ActivityEditDao');

module.exports = {
	
	doesActivityBelongToLD: function(ldId, activityId, callback) {
		activityEditDao.getComposesCount(ldId, activityId, function(err, result) {
			if(err || result[0].count_id !== 1){
				callback(false);
			} else {
				callback(true);
			}
		});
	}

}; 