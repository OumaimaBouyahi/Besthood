'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Community = mongoose.model('Community'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Community
 */
exports.create = function(req, res) {
  var community = new Community(req.body);
  community.user = req.user;

  community.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(community);
    }
  });
};

/**
 * Show the current Community
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var community = req.community ? req.community.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  community.isCurrentUserOwner = req.user && community.user && community.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(community);
};

/**
 * Update a Community
 */
exports.update = function(req, res) {
  var community = req.community ;

  community = _.extend(community , req.body);

  community.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(community);
    }
  });
};

/**
 * Delete an Community
 */
exports.delete = function(req, res) {
  var community = req.community ;

  community.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(community);
    }
  });
};

/**
 * List of Communities
 */
exports.list = function(req, res) { 
  Community.find().sort('-created').populate('user').exec(function(err, communities) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(communities);
    }
  });
};

/**
 * Community middleware
 */
exports.communityByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Community is invalid'
    });
  }

  Community.findById(id).populate('user').exec(function (err, community) {
    if (err) {
      return next(err);
    } else if (!community) {
      return res.status(404).send({
        message: 'No Community with that identifier has been found'
      });
    }
    req.community = community;
    next();
  });
};
