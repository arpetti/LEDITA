var LdEditDao = require('../dao/LdEditDao');
var messages = require('../validate/ValidationMessages');

module.exports = {

	// #28 wip, still needs unit tests, investigating http request for PUT...
	// callback(err)
	updateLdName: function(ldName, ldId, callback) {
		LdEditDao.updateLdName(ldName, ldId, function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback();
			}
		});
	}
};