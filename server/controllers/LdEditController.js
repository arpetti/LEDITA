var LdEditValidator = require('../validate/LdEditValidator');
var LdEditService = require('../service/LdEditService');
var messages = require('../validate/ValidationMessages');

module.exports = {

	updateLdName: function(req, res) {
		var ldId = req.params.id;
		var ldData = req.body;

		var vmessages = LdEditValidator.validateLdName(ldData.ldName);
        if (vmessages.length > 0) {
            return res.send(400, vmessages);
        };
		
		LdEditService.updateLdName(ldData.ldName, ldId, function(err, result, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {ldName: ldData.ldName});
			}
		});
	},

	updateStudentsDescr: function(req, res) {
		var ldId = req.params.id;
		var ldData = req.body;

		var vmessages = LdEditValidator.validateStudentsDescr(ldData.studentsDescr);
        if (vmessages.length > 0) {
            return res.send(400, vmessages);
        };
		
		LdEditService.updateStudentsDescr(ldData.studentsDescr, ldId, function(err, result, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {studentsDescr: ldData.studentsDescr});
			}
		});
	}

};