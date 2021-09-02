const wdioParallel = require('wdio-cucumber-parallel-execution');
const reporter = require('cucumber-html-reporter');
const getOption = require('../reports/cucumberReportOptions');
const FileUtil = require('../src/framework/utils/file.util');

const LOG_DIR = 'logs/log.log';
const REPORT_DIR = 'reports/json/';
const HTML_REPORT_DIR = 'reports/html/';
const SCREEN_DIR = 'reports/screenshots/';

const BROWSER_NAME_REGEX = /^.*wdio\.(.*)\.conf.*$/;

exports.config = {
  runner: 'local',
  specs: [
    './src/test/features/**/*.feature'
    ],
    exclude: [],
    maxInstances: 3,
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'http://localhost/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
      require: ['./src/test/steps/**/*.js'],
      backtrace: false,
      requireModule: [],
      dryRun: false,
      failFast: false,
      format: ['pretty'],
      snippets: true,
      source: true,
      profile: [],
      strict: false,
      tagExpression: '@automated',
      timeout: 60000,
      ignoreUndefinedDefinitions: false
    },

    onPrepare: function() {
      FileUtil.deleteFile(LOG_DIR);
      FileUtil.createFolder(REPORT_DIR);
      FileUtil.createFolder(HTML_REPORT_DIR);
      FileUtil.reCreateFolder(SCREEN_DIR);
    },

    onComplete: function() {
      const consolidatedJsonArray = wdioParallel.getConsolidatedData({
        parallelExecutionReportDirectory: REPORT_DIR
      });

      const jsonReportFile = `${REPORT_DIR}report.json`;
      FileUtil.writeToFile(jsonReportFile, JSON.stringify(consolidatedJsonArray));

      const browserName = process.env.npm_lifecycle_script.match(BROWSER_NAME_REGEX)[1];

      reporter.generate(getOption(jsonReportFile, browserName));
    }
}
