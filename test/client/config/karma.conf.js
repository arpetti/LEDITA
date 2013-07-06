basePath = '../';

// FIXME: Figure out correct paths, download angular 1.0.7 source for test dir
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/lib/angular/*.js',
  'app/js/*.js',
  'test/lib/angular/angular-mocks.js',
  'test/unit/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

reporters = ['progress'];