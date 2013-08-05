var env = require('../../env.json');

exports.config = function() {
	if (!process.env.NODE_ENV) {
		console.warn('WARNING: process.env.NODE_ENV is not set, using default: dev');
	}
	var node_env = process.env.NODE_ENV || 'dev';
	return env[node_env];
};
