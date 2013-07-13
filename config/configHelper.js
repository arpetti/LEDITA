var env = require(__dirname + '/env.json');

exports.config = function() {
  var node_env = process.env.NODE_ENV || 'dev';
  return env[node_env];
};
