var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
    sharedConfig(config);
  
    config.set({
        basePath: '../',

        // list of files / patterns to load in the browser
        files: [
            '../../client/js/lib/underscore-min.js',
            '../../client/js/lib/angular/angular.js',
            '../../client/js/lib/angular/angular-cookies.js',
            '../../client/js/lib/ng-infinite-scroll.min.js',
            '../../client/js/lib/ui-bootstrap-tpls-0.4.0.min.js',
            '../../client/js/lib/ui-utils.min.js',
            '../../client/js/app.js',
            '../../client/js/auth/*.js',
            '../../client/js/common/*.js',
            '../../client/js/ld/*.js',
            '../../client/js/lib/angular/angular-mocks.js',
            'unit/**/*.js'
        ],
        
        // web server port
        port: 9876,

        colors: true,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode, if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
