var LdEditValidator = require('../validate/LdEditValidator');
var LdEditService = require('../service/LdEditService');
var messages = require('../validate/ValidationMessages');

module.exports = {

	// #28 wip - what does req look like for http PUT?
	updateLdName: function(req, res) {
		var ldId = req.params.id;
		console.log('LdEditController: req.params.id: ' + ldId);
		var ldData = req.body;
		console.log('LdEditController: req.body: ' + ldData);

		// TODO LdEditValidator, if have messages, return 400 with messages
		// TODO LdEditService
		
		// Not sure what to send back assuming update was successful, refetch entire LD/Structure and send it back?
		var result = {};
        res.json(200, result);
	}

};