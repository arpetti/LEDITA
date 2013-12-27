var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  sharedConfig(config);

  config.set({
  	basePath: '../',
  	proxyValidateSSL: false,
  	singleRun: true,
    frameworks: [],
    files: [
      'lib/jquery.js',
      '../../node_modules/karma-ng-scenario/lib/angular-scenario.js',
      '../../node_modules/karma-ng-scenario/lib/adapter.js',
      'lib/custom/**/*.js',
  	  'e2e/**/*.js'
    ],

    proxies: {
      '/': 'https://localhost:8443'
    },

    junitReporter: {
      outputFile: 'test_out/e2e.xml',
      suite: 'E2E'
    }
  });
};