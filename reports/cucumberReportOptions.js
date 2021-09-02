const moment = require('moment');
const { type } = require('os');
const { APP_VERSION, ENVIRONMENT } = require('../src/environment/env.config');

const DATE_FORMAT = 'DD_MM_YY';

module.exports = function(fileName, browserName) {
  return {
    "theme": 'bootstrap',
    jsonFile: fileName,
    output: `reports/html/report_${ENVIRONMENT}_${browserName}_${moment().format(DATE_FORMAT)}.html`,
    name: 'DEMO PROJECT',
    brandTitle: 'ALEXANDR PISANIK projects',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    ignoreBadJsonFile: true,
    metadata: {
      'App Version': APP_VERSION,
      'Environment': ENVIRONMENT,
      Platform: `${type()}`,
      Browser: browserName,
      Parallel: 'Scenarios',
    },
  }
}