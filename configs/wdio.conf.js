const fs = require('fs');

const logDir = 'logs/log.log';

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
      fs.access(logDir, fs.constants.F_OK, (err) => {
        if(!err) {
          fs.unlinkSync(logDir);
        }
      });
    }
}
