basePath = '../';

// FIXME: Figure out correct paths, download angular 1.0.7 source for test dir
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'client/js/lib/angular/*.js',
  'client/js/*.js',
  'client/js/auth/*.js',
  'test/client/lib/angular/angular-mocks.js',
  'test/unit/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

reporters = ['progress'];