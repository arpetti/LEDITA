basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'lib/custom/**/*.js',
  'e2e/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

singleRun = true;

proxies = {
  '/': 'http://localhost:8000'
};

reporters = [
	'progress',
	'dots'
];

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};