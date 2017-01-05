'use strict';

/**
 * Module dependencies
 */
var communitiesPolicy = require('../policies/communities.server.policy'),
  communities = require('../controllers/communities.server.controller');

module.exports = function(app) {
  // Communities Routes
  app.route('/api/communities').all(communitiesPolicy.isAllowed)
    .get(communities.list)
    .post(communities.create);

  app.route('/api/communities/:communityId').all(communitiesPolicy.isAllowed)
    .get(communities.read)
    .put(communities.update)
    .delete(communities.delete);

  // Finish by binding the Community middleware
  app.param('communityId', communities.communityByID);
};
