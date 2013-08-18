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

    LD_NUMBER_OF_DATA_ELEMENTS: 3,

    getLearningDesignPromise: function(ldid) {
        var promiseDaoGetLd = nodefn.call(LdDao.getLearningDesign, ldid);
        var promiseDaoGetLdSubjects = nodefn.call(LdDao.getLearningDesignSubjects, ldid);
        var promiseDaoGetLdObjectives = nodefn.call(LdDao.getLearningDesignObjectives, ldid);

        var joinedPromise = when.join(promiseDaoGetLd, promiseDaoGetLdSubjects, promiseDaoGetLdObjectives);
        return joinedPromise;
    },

    //TODO: make this work with mocha async style testing
    // callback(err, message, learningDesignDetail)
    getLearningDesignDetail: function(ldid, callback) {
        var learningDesignDetail = {};
        
        var promiseDaoGetLd = nodefn.call(LdDao.getLearningDesign, ldid);
        var promiseDaoGetLdSubjects = nodefn.call(LdDao.getLearningDesignSubjects, ldid);
        var promiseDaoGetLdObjectives = nodefn.call(LdDao.getLearningDesignObjectives, ldid);

        var joinedPromise = when.join(promiseDaoGetLdSubjects, promiseDaoGetLdObjectives);

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

        joinedPromise.then(function (values) {
            learningDesignDetail.subjects = values[0];
            learningDesignDetail.objectives = values[1];
            callback(null, null, learningDesignDetail);
        }, function(err) {
            callback(err);
            return;
        });

        // promiseDaoGetLdSubjects.then(function(results) {
        //     learningDesignDetail.subjects = results;
        // }, function(err) {
        //     callback(err);
        //     return;
        // });

        // promiseDaoGetLdObjectives.then(function(results) {
        //     learningDesignDetail.objectives = results;
        //     callback(null, null, learningDesignDetail);
        // }, function(err) {
        //     callback(err);
        // });

    }
};