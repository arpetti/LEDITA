var LdDao = require('../dao/LdDao');
var when   = require('when');
var nodefn = require('when/node/function');
var messages = require('./ValidationMessages');
var async = require('async');
var _ = require('underscore');

module.exports = {

    LD_NUMBER_OF_DATA_ELEMENTS: 5,

    getLearningDesignPromise: function(ldid) {
        var promiseDaoGetLd = nodefn.call(LdDao.getLearningDesign, ldid);
        var promiseDaoGetLdSubjects = nodefn.call(LdDao.getLearningDesignSubjects, ldid);
        var promiseDaoGetLdObjectives = nodefn.call(LdDao.getLearningDesignObjectives, ldid);
        var promiseDaoGetLdPrerequisites = nodefn.call(LdDao.getPrerequisites, ldid);
        var promiseDaoGetLdQcers = nodefn.call(LdDao.getQcers, ldid);

        return when.join(promiseDaoGetLd, promiseDaoGetLdSubjects, 
            promiseDaoGetLdObjectives, promiseDaoGetLdPrerequisites, promiseDaoGetLdQcers);
    },

    // callback(err, result, message)
    getAllLearningDesigns: function(callback) {
        async.waterfall([
            function(callback) {
                LdDao.getLearningDesigns(function(err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, _.pluck(results, 'ld_id'), results);
                    }
                })
            },
            function(ldids, lds, callback)  {
                if (ldids && ldids.length == 0) {
                    callback(null, lds);
                } else {
                    LdDao.getQcersWithLdId(ldids, function(err, results) {
                        if (err) {
                            callback(err);
                        } else {
                            var qcersByLdid = _.groupBy(results, function(element){return element.ld_id});
                            var enrichLds = _.map(lds, function(element) {
                                element.qcers = qcersByLdid[element.ld_id];
                                return element;
                            });
                            callback(null, enrichLds);
                        }
                    });
                }
            }
        ], function (err, result) {
           if (err) {
                callback(err, null, messages.UNABLE_TO_RETRIEVE_LDS);
           } else {
                callback(null, result, null);
           }
        });
    }
};