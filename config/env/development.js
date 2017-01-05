'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'ds013981.mlab.com:13981') + '/besthood',
    options: {
      user: 'besthood',
      pass: 'besthood'
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    options: {
      // Stream defaults to process.stdout
      // Uncomment/comment to toggle the logging to a log on the file system
      //stream: {
      //  directoryPath: process.cwd(),
      //  fileName: 'access.log',
      //  rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
      //    active: false, // activate to use rotating logs 
      //    fileName: 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
      //    frequency: 'daily',
      //    verbose: false
      //  }
      //}
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Besthood'
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
    clientID: process.env.GOOGLE_ID || '203291022908-v042mid7fdjptb0k34lmg7d9go541s4v.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'ZgjlGhkXXZErynxLTi51VcsI',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    from: process.env.MAILER_FROM || 'bmt.transportpublic@gmail.com',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
      auth: {
        user: process.env.MAILER_EMAIL_ID || '82053308351-e99rd3i3lm1ts1jolrr7h2c6dlosdedf.apps.googleusercontent.com',
        pass: process.env.MAILER_PASSWORD || 'oF1clVzvnt4j3wQimX8XpNwY'
      }
    }
  },
  livereload: true,
  seedDB: {
    seed: process.env.MONGO_SEED === 'true' ? true : false,
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS === 'false' ? false : true,
      seedUser: {
        username: process.env.MONGO_SEED_USER_USERNAME || 'ebdelli khaled',
        provider: 'local',
        email: process.env.MONGO_SEED_USER_EMAIL || 'khaled.ebdelli@esprit.tn',
        firstName: 'khaled',
        lastName: 'ebdelli',
        displayName: 'ebdelli khaled',
        roles: ['user']
      },
      seedAdmin: {
        username: process.env.MONGO_SEED_ADMIN_USERNAME || 'ebdelli khaled',
        provider: 'local',
        email: process.env.MONGO_SEED_ADMIN_EMAIL || 'khaled.ebdelli@esprit.tn',
        firstName: 'khaled',
        lastName: 'ebdelli',
        displayName: 'ebdelli khaled',
        roles: ['user', 'admin']
      }
    }
  }
};
