module.exports = function(config) {
  config.set({
  	basePath: '../',
    frameworks: ['jasmine'],
    autoWatch: false,
    logLevel: config.LOG_INFO,
    logColors: true,
    browsers: ['Chrome'],
    reporters: ['progress', 'dots', 'coverage'],

    // source files for which coverage should be generated
    preprocessors: {
    	'../../client/js/app.js': ['coverage'],
      '../../client/js/auth/*.js': ['coverage'],
      '../../client/js/common/*.js': ['coverage'],
      '../../client/js/ld/*.js': ['coverage'],
      '../../client/js/activity/*.js': ['coverage'],
      '../../client/js/user/*.js': ['coverage']
    }

  });
};