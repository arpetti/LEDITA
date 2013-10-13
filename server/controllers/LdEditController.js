var LdEditValidator = require('../validate/LdEditValidator');
var LdEditService = require('../service/LdEditService');
var messages = require('../validate/ValidationMessages');

module.exports = {

	// #28 wip - needs unit tests
	updateLdName: function(req, res) {
		var ldId = req.params.id;
		var ldData = req.body;

		var ldNameErrors = LdEditValidator.validateLdName(ldData.ldName);
        if (ldNameErrors.length > 0) {
            return res.send(400, ldNameErrors);
        };
		
		LdEditService.updateLdName(ldData.ldName, ldId, function(err, result, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {ldName: ldData.ldName});
			}
		});

	}

};