'use strict';

var cfenv = require('cfenv'),
  appEnv = cfenv.getAppEnv();
var cfMongoUrl = (function() {
  if (appEnv.getService('mean-mongo')) {
    var mongoCreds = appEnv.getService('mean-mongo').credentials;
    return mongoCreds.uri || mongoCreds.url;
  } else {
    throw new Error('No service names "mean-mongo" bound to the application.');
  }
}());

var getCred = function (serviceName, credProp) {
  return appEnv.getService(serviceName) ?
    appEnv.getService(serviceName).credentials[credProp] : undefined;
};

module.exports = {
  port: appEnv.port,
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'ds013981.mlab.com:13981') + '/besthood',
    options: {
      user: 'besthood',
      pass: 'besthood'
    }
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // By default we want logs to go to process.out so the Cloud Foundry Loggregator will collect them
    options: {}
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '1528566004105179',
    clientSecret: process.env.FACEBOOK_SECRET || 'd1536a62112239867aa32fe1289aadac',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'UUc5M4Xke6ZxnVe7aVY0P0HMC',
    clientSecret: process.env.TWITTER_SECRET || 'TDJUU4Og44f3x16MTsstnt43FwI8E1QBKH9UknTdxWdQBNpTeN',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '477380247059-pbot3vt5154qgs4de1621cpub797ulaj.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'HO-MqF3zbiMfcM1Pq2_1oa3q',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: getCred('mean-linkedin', 'id') || 'APP_ID',
    clientSecret: getCred('mean-linkedin', 'secret') || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: getCred('mean-github', 'id') || 'APP_ID',
    clientSecret: getCred('mean-github', 'secret') || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: getCred('mean-paypal', 'id') || 'CLIENT_ID',
    clientSecret: getCred('mean-paypal', 'secret') || 'CLIENT_SECRET',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: false
  },
  mailer: {
    from: getCred('mean-mail', 'from') || 'MAILER_FROM',
    options: {
      service: getCred('mean-mail', 'service') || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: getCred('mean-mail', 'username') || 'MAILER_EMAIL_ID',
        pass: getCred('mean-mail', 'password') || 'MAILER_PASSWORD'
      }
    }
  },
  seedDB: {
    seed: process.env.MONGO_SEED === 'true' ? true : false,
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS === 'false' ? false : true,
      seedUser: {
        username: process.env.MONGO_SEED_USER_USERNAME || 'user',
        provider: 'local',
        email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
        firstName: 'User',
        lastName: 'Local',
        displayName: 'User Local',
        roles: ['user']
      },
      seedAdmin: {
        username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
        provider: 'local',
        email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
        firstName: 'Admin',
        lastName: 'Local',
        displayName: 'Admin Local',
        roles: ['user', 'admin']
      }
    }
  }
};
