var LdCreateDao = require('../dao/LdCreateDao');
var async = require('async');
var messages = require('./ValidationMessages');

var createLdForInsert = function(userId, ldData) {
	var ldObj = {
		user_id: userId,
		name: ldData.name,
		scope: ldData.scope,
		students_profile: ldData.studentsDescription
	};
	return ldObj;
};

module.exports = {

	// callback(err, ldid, message)
	createLd: function(userId, ldData, callback) {

		// TODO Input validation

		async.waterfall([
            function(callback) {
            	var ldObj = createLdForInsert(userId, ldData);
                LdCreateDao.createLd(ldObj, function(err, ldid) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, ldid);
                    }
                })
            },
            function(ldid, callback)  {
            	console.log('Future task to attach qcers for ldid: ' + ldid);
            	callback(null, ldid); 
            },
            function(ldid, callback)  {
            	console.log('Future task to insert or attach topics for ldid: ' + ldid);
            	callback(null, ldid); 
            },
            function(ldid, callback)  {
            	console.log('Future task to insert or attach objectives for ldid: ' + ldid);
            	callback(null, ldid); 
            },
            function(ldid, callback)  {
            	console.log('Future task to insert or attach requisites for ldid: ' + ldid);
            	callback(null, ldid); 
            }
        ], function (err, ldid) {
           if (err) {
                callback(err, null, messages.UNABLE_TO_CREATE_LD);
           } else {
                callback(null, ldid, null);
           }
        });
	}

};