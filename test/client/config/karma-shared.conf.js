module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    autoWatch: false,
    logLevel: config.LOG_INFO,
    logColors: true,
    browsers: ['Chrome'],
    reporters: ['progress', 'dots']
  });
};