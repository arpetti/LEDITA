var RefDao = require('../dao/RefDao');
var LdCreateDao = require('../dao/LdCreateDao');

module.exports = {

	//callback(err, scopeId)
	getScopeId: function(scopeName, callback) {
		var scopeData = {name: scopeName};
		RefDao.findScopeByName(scopeData, function(err, results) {
			if (err) {
				callback(err);
			} else {
				if (results.length === 1) {
					callback(null, results[0].id);
				} else {
					LdCreateDao.insertScope(scopeData, function(err, scopeId) {
						if (err) {
							callback(err);
						} else {
							callback(null, scopeId);
						}
					});
				};
			}
		});
	}
};