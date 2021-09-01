const { config } = require('./wdio.conf');

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
          args: [
            '--incognito',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--headless'
          ]
        },
      }
    ],
    services: ['selenium-standalone'],
  }
}