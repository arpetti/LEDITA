var LdDao = require('../dao/LdDao')
	, messages = require('./ValidationMessages');

module.exports = {

	// TOOD: Use when fnlift to convert async's to promises and reduce xmas tree code!
	// callback(err, message, learningDesignDetail)
	getLearningDesignDetail: function(ldid, callback) {
		var learningDesignDetail = {};
		LdDao.getLearningDesign(ldid, function(err, learningDesign) {
            if(err) {
                callback(err);
                return;
            } else { 
                if (learningDesign.length === 0) {
                    callback(null, messages.LD_NOT_FOUND, null);
                    return;
                }
                learningDesignDetail = learningDesign[0];
                LdDao.getLearningDesignSubjects(ldid, function(err, results) {
                	if(err) {
                		callback(err);
                		return;
                	} else {
                		learningDesignDetail.subjects = results;
                		callback(null, null, learningDesignDetail);
                	}
                });
            }
        });
	}
};