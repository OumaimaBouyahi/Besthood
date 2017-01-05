'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Claim = mongoose.model('Claim'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, claim;

/**
 * Claim routes tests
 */
describe('Claim CRUD tests', function () {

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
      provider: 'local',
      community: credentials.community

    });

    // Save a user to the test db and create new Claim
    user.save(function () {
      claim = {
        name: 'Claim name'
      };

      done();
    });
  });

  it('should be able to save a Claim if logged in', function (done) {
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

        // Save a new Claim
        agent.post('/api/claims')
          .send(claim)
          .expect(200)
          .end(function (claimSaveErr, claimSaveRes) {
            // Handle Claim save error
            if (claimSaveErr) {
              return done(claimSaveErr);
            }

            // Get a list of Claims
            agent.get('/api/claims')
              .end(function (claimsGetErr, claimsGetRes) {
                // Handle Claim save error
                if (claimsGetErr) {
                  return done(claimsGetErr);
                }

                // Get Claims list
                var claims = claimsGetRes.body;

                // Set assertions
                (claims[0].user._id).should.equal(userId);
                (claims[0].name).should.match('Claim name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Claim if not logged in', function (done) {
    agent.post('/api/claims')
      .send(claim)
      .expect(403)
      .end(function (claimSaveErr, claimSaveRes) {
        // Call the assertion callback
        done(claimSaveErr);
      });
  });

  it('should not be able to save an Claim if no name is provided', function (done) {
    // Invalidate name field
    claim.name = '';

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

        // Save a new Claim
        agent.post('/api/claims')
          .send(claim)
          .expect(400)
          .end(function (claimSaveErr, claimSaveRes) {
            // Set message assertion
            (claimSaveRes.body.message).should.match('Please fill Claim name');

            // Handle Claim save error
            done(claimSaveErr);
          });
      });
  });

  it('should be able to update an Claim if signed in', function (done) {
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

        // Save a new Claim
        agent.post('/api/claims')
          .send(claim)
          .expect(200)
          .end(function (claimSaveErr, claimSaveRes) {
            // Handle Claim save error
            if (claimSaveErr) {
              return done(claimSaveErr);
            }

            // Update Claim name
            claim.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Claim
            agent.put('/api/claims/' + claimSaveRes.body._id)
              .send(claim)
              .expect(200)
              .end(function (claimUpdateErr, claimUpdateRes) {
                // Handle Claim update error
                if (claimUpdateErr) {
                  return done(claimUpdateErr);
                }

                // Set assertions
                (claimUpdateRes.body._id).should.equal(claimSaveRes.body._id);
                (claimUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Claims if not signed in', function (done) {
    // Create new Claim model instance
    var claimObj = new Claim(claim);

    // Save the claim
    claimObj.save(function () {
      // Request Claims
      request(app).get('/api/claims')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Claim if not signed in', function (done) {
    // Create new Claim model instance
    var claimObj = new Claim(claim);

    // Save the Claim
    claimObj.save(function () {
      request(app).get('/api/claims/' + claimObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', claim.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Claim with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/claims/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Claim is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Claim which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Claim
    request(app).get('/api/claims/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Claim with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Claim if signed in', function (done) {
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

        // Save a new Claim
        agent.post('/api/claims')
          .send(claim)
          .expect(200)
          .end(function (claimSaveErr, claimSaveRes) {
            // Handle Claim save error
            if (claimSaveErr) {
              return done(claimSaveErr);
            }

            // Delete an existing Claim
            agent.delete('/api/claims/' + claimSaveRes.body._id)
              .send(claim)
              .expect(200)
              .end(function (claimDeleteErr, claimDeleteRes) {
                // Handle claim error error
                if (claimDeleteErr) {
                  return done(claimDeleteErr);
                }

                // Set assertions
                (claimDeleteRes.body._id).should.equal(claimSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Claim if not signed in', function (done) {
    // Set Claim user
    claim.user = user;

    // Create new Claim model instance
    var claimObj = new Claim(claim);

    // Save the Claim
    claimObj.save(function () {
      // Try deleting Claim
      request(app).delete('/api/claims/' + claimObj._id)
        .expect(403)
        .end(function (claimDeleteErr, claimDeleteRes) {
          // Set message assertion
          (claimDeleteRes.body.message).should.match('User is not authorized');

          // Handle Claim error error
          done(claimDeleteErr);
        });

    });
  });

  it('should be able to get a single Claim that has an orphaned user reference', function (done) {
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

          // Save a new Claim
          agent.post('/api/claims')
            .send(claim)
            .expect(200)
            .end(function (claimSaveErr, claimSaveRes) {
              // Handle Claim save error
              if (claimSaveErr) {
                return done(claimSaveErr);
              }

              // Set assertions on new Claim
              (claimSaveRes.body.name).should.equal(claim.name);
              should.exist(claimSaveRes.body.user);
              should.equal(claimSaveRes.body.user._id, orphanId);

              // force the Claim to have an orphaned user reference
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

                    // Get the Claim
                    agent.get('/api/claims/' + claimSaveRes.body._id)
                      .expect(200)
                      .end(function (claimInfoErr, claimInfoRes) {
                        // Handle Claim error
                        if (claimInfoErr) {
                          return done(claimInfoErr);
                        }

                        // Set assertions
                        (claimInfoRes.body._id).should.equal(claimSaveRes.body._id);
                        (claimInfoRes.body.name).should.equal(claim.name);
                        should.equal(claimInfoRes.body.user, undefined);

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
      Claim.remove().exec(done);
    });
  });
});
