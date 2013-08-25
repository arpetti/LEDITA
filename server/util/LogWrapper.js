var log4js = require('log4js');

log4js.configure('./server-log-cfg.json');

var logger = log4js.getLogger();
var connectLogger = log4js.connectLogger(logger, { level: log4js.levels.INFO });

module.exports = {

	log: function() {
		return logger;
	},

	connectLog: function() {
		return connectLogger;
	}

};