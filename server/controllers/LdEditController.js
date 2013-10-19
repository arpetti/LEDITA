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
		
		LdEditService.updateLdName(ldData.ldName, ldId, function(err, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {ldName: ldData.ldName});
			}
		});
	},

	updateLdScope: function(req, res) {
		var ldId = req.params.id;
		var ldData = req.body;

		var vmessages = LdEditValidator.validateLdScope(ldData.ldScope);
        if (vmessages.length > 0) {
            return res.send(400, vmessages);
        };
		
		LdEditService.updateLdScope(ldData.ldScope, ldId, function(err, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {ldScope: ldData.ldScope});
			}
		});
	},

	updateQcers: function(req, res) {
		var ldId = req.params.id;
		var ldData = req.body;

		var vmessages = LdEditValidator.validateQcers(ldData.ldQcers);
        if (vmessages.length > 0) {
            return res.send(400, vmessages);
        };
		
		LdEditService.updateQcers(ldData.ldQcers, ldId, function(err, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {});
			}
		}); 
	},

	addTopic: function(req, res) {
		var ldId = req.params.id;
		var ldData = req.body;

		var vmessages = LdEditValidator.validateTopic(ldData.topic);
        if (vmessages.length > 0) {
            return res.send(400, vmessages);
        };
		
		LdEditService.addTopic(ldData.topic, ldId, function(err, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {});
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
		
		LdEditService.updateStudentsDescr(ldData.studentsDescr, ldId, function(err, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {studentsDescr: ldData.studentsDescr});
			}
		});
	},

	updateLdPublic: function(req, res) {
		var ldId = req.params.id;
		LdEditService.updateLdPublic(ldId, function(err, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {});
			}
		});
	},

	updateLdPrivate: function(req, res) {
		var ldId = req.params.id;
		LdEditService.updateLdPrivate(ldId, function(err, message) {
			if (err) {
				return res.send(500, message); 
			} else {
		        res.json(200, {});
			}
		});
	}

};