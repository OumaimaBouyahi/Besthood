'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Community = mongoose.model('Community'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, community;

/**
 * Community routes tests
 */
describe('Community CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Community
    user.save(function () {
      community = {
        name: 'Community name'
      };

      done();
    });
  });

  it('should be able to save a Community if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Community
        agent.post('/api/communities')
          .send(community)
          .expect(200)
          .end(function (communitySaveErr, communitySaveRes) {
            // Handle Community save error
            if (communitySaveErr) {
              return done(communitySaveErr);
            }

            // Get a list of Communities
            agent.get('/api/communities')
              .end(function (communitysGetErr, communitysGetRes) {
                // Handle Community save error
                if (communitysGetErr) {
                  return done(communitysGetErr);
                }

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Community if not logged in', function (done) {
    agent.post('/api/communities')
      .send(community)
      .expect(403)
      .end(function (communitySaveErr, communitySaveRes) {
        // Call the assertion callback
        done(communitySaveErr);
      });
  });

  it('should not be able to save an Community if no name is provided', function (done) {
    // Invalidate name field
    community.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Community
        agent.post('/api/communities')
          .send(community)
          .expect(400)
          .end(function (communitySaveErr, communitySaveRes) {
            // Set message assertion
            (communitySaveRes.body.message).should.match('Please fill Community name');

            // Handle Community save error
            done(communitySaveErr);
          });
      });
  });

  it('should be able to update an Community if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Community
        agent.post('/api/communities')
          .send(community)
          .expect(200)
          .end(function (communitySaveErr, communitySaveRes) {
            // Handle Community save error
            if (communitySaveErr) {
              return done(communitySaveErr);
            }

            // Update Community name
            community.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Community
            agent.put('/api/communities/' + communitySaveRes.body._id)
              .send(community)
              .expect(200)
              .end(function (communityUpdateErr, communityUpdateRes) {
                // Handle Community update error
                if (communityUpdateErr) {
                  return done(communityUpdateErr);
                }

                // Set assertions
                (communityUpdateRes.body._id).should.equal(communitySaveRes.body._id);
                (communityUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Communities if not signed in', function (done) {
    // Create new Community model instance
    var communityObj = new Community(community);

    // Save the community
    communityObj.save(function () {
      // Request Communities
      request(app).get('/api/communities')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Community if not signed in', function (done) {
    // Create new Community model instance
    var communityObj = new Community(community);

    // Save the Community
    communityObj.save(function () {
      request(app).get('/api/communities/' + communityObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', community.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Community with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/communities/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Community is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Community which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Community
    request(app).get('/api/communities/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Community with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Community if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Community
        agent.post('/api/communities')
          .send(community)
          .expect(200)
          .end(function (communitySaveErr, communitySaveRes) {
            // Handle Community save error
            if (communitySaveErr) {
              return done(communitySaveErr);
            }

            // Delete an existing Community
            agent.delete('/api/communities/' + communitySaveRes.body._id)
              .send(community)
              .expect(200)
              .end(function (communityDeleteErr, communityDeleteRes) {
                // Handle community error error
                if (communityDeleteErr) {
                  return done(communityDeleteErr);
                }

                // Set assertions
                (communityDeleteRes.body._id).should.equal(communitySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Community if not signed in', function (done) {
    // Set Community user
    community.user = user;

    // Create new Community model instance
    var communityObj = new Community(community);

    // Save the Community
    communityObj.save(function () {
      // Try deleting Community
      request(app).delete('/api/communities/' + communityObj._id)
        .expect(403)
        .end(function (communityDeleteErr, communityDeleteRes) {
          // Set message assertion
          (communityDeleteRes.body.message).should.match('User is not authorized');

          // Handle Community error error
          done(communityDeleteErr);
        });

    });
  });

  it('should be able to get a single Community that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Community
          agent.post('/api/communities')
            .send(community)
            .expect(200)
            .end(function (communitySaveErr, communitySaveRes) {
              // Handle Community save error
              if (communitySaveErr) {
                return done(communitySaveErr);
              }

              // Set assertions on new Community
              (communitySaveRes.body.name).should.equal(community.name);
              should.exist(communitySaveRes.body.user);
              should.equal(communitySaveRes.body.user._id, orphanId);

              // force the Community to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Community
                    agent.get('/api/communities/' + communitySaveRes.body._id)
                      .expect(200)
                      .end(function (communityInfoErr, communityInfoRes) {
                        // Handle Community error
                        if (communityInfoErr) {
                          return done(communityInfoErr);
                        }

                        // Set assertions
                        (communityInfoRes.body._id).should.equal(communitySaveRes.body._id);
                        (communityInfoRes.body.name).should.equal(community.name);
                        should.equal(communityInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Community.remove().exec(done);
    });
  });
});
