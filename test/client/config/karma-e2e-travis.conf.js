var sharedConfigE2E = require('./karma-e2e.conf');

module.exports = function(config) {
  sharedConfigE2E(config);

  config.set({
  	exclude: ['e2e/activity-create-scenarios.js'],
  });
};