exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['assets/src/js/e2e-tests/scenarios.js'],
};
