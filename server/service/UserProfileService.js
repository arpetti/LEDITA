var UserProfileDao = require('../dao/UserProfileDao');
var when   = require('when');
var nodefn = require('when/node/function');
var messages = require('./ValidationMessages');
var async = require('async');
var _ = require('underscore');

module.exports = {

    USER_NUMBER_OF_DATA_ELEMENTS: 2,

    getUserProfilePromise: function(userid, ldid) {
        var promiseDaoGetUserProfile = nodefn.call(UserProfileDao.getUserProfile, userid);
        var promiseDaoGetLdQcers = nodefn.call(UserProfileDao.getQcers, ldid);

        return when.join(promiseDaoGetUserProfile, promiseDaoGetLdQcers);
    },

    // callback(err, result, message)
    getAllUserProfiles: function(callback) {
        async.waterfall([
            function(callback) {
                UserProfileDao.getUserProfiles(function(err, results) {
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
                    UserProfileDao.getQcersWithLdId(ldids, function(err, results) {
                        if (err) {
                            callback(err);
                        } else {
                            var qcersByLdid = _.groupBy(results, function(element){return element.ld_id});
                            var enrichUsers = _.map(lds, function(element) {
                                element.qcers = qcersByLdid[element.ld_id];
                                return element;
                            });
                            callback(null, enrichUsers);
                        }
                    });
                }
            }
        ], function (err, result) {
            if (err) {
                callback(err, null, messages.UNABLE_TO_RETRIEVE_USERS);
            } else {
                callback(null, result, null);
            }
        });
    }
};