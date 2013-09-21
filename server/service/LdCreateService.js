var LdCreateDao = require('../dao/LdCreateDao');
var async = require('async');
var messages = require('./ValidationMessages');
var _ = require('underscore');

var createLdForInsert = function(userId, ldData) {
	var ldObj = {
		user_id: userId,
		name: ldData.name,
		scope: ldData.scope,
		students_profile: ldData.studentsDescription
	};
	return ldObj;
};

var getSelectedQcers = function(ldData) {
	var potentialQcers = ldData.qcers;
	var selectedQcers = [];
	for (var key in potentialQcers) {
		var value = potentialQcers[key];
		if(value === true) {
			selectedQcers.push(key);
		}
	};
	return _.map(selectedQcers, function(element) {return parseInt(element,10); });
}

module.exports = {

	// callback(err, ldid, message)
	createLd: function(userId, ldData, callback) {

		// TODO Input validation, make sure qcer ids are numbers

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
            	var qcerIds = getSelectedQcers(ldData);
            	console.log('Future task will attach these qcers to ld:' + JSON.stringify(qcerIds));
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