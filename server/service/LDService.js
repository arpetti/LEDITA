var LdDao = require('../dao/LdDao')
    , when   = require('when')
    , nodefn = require('when/node/function')
	, messages = require('./ValidationMessages');

/*
    Using cujos/when module to convert async dao calls to promises,
    to avoid the dreaded "christmas tree" code - deep nested async calls.
    https://github.com/cujojs/when/blob/master/docs/api.md#node-style-asynchronous-functions
*/
module.exports = {

    // callback(err, message, learningDesignDetail)
    getLearningDesignDetail: function(ldid, callback) {
        var learningDesignDetail = {};
        
        var promiseDaoGetLd = nodefn.call(LdDao.getLearningDesign, ldid);
        var promiseDaoGetLdSubjects = nodefn.call(LdDao.getLearningDesignSubjects, ldid);

        promiseDaoGetLd.then(function(results) {
            if (results.length === 0) {
                callback(null, messages.LD_NOT_FOUND, null);
                return;
            }
            learningDesignDetail = results[0];
        }, function(err) {
            callback(err);
            return;
        });

        promiseDaoGetLdSubjects.then(function(results) {
            learningDesignDetail.subjects = results;
            callback(null, null, learningDesignDetail);
        }, function(err) {
            callback(err);
            return;
        });

    }
};