var configHelper = require('./ConfigHelper');
var config = configHelper.config();

module.exports = {

	csrfValue : function(req) {
		var token = (req.body && req.body._csrf) 
			|| (req.query && req.query._csrf) 
			|| (req.headers['x-csrf-token']) 
			|| (req.headers['x-xsrf-token']);
		return token;
	},

	angularCsrf : function() {
		return function(req, res, next) {
			res.cookie('XSRF-TOKEN', req.session._csrf, {secure: config.encrypt_cookie});
			next();
		};
	}

};