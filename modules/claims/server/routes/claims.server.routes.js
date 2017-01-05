'use strict';

/**
 * Module dependencies
 */
var claimsPolicy = require('../policies/claims.server.policy'),
    claims = require('../controllers/claims.server.controller');

module.exports = function (app) {
    // Claims Routes
    app.route('/api/claims').all(claimsPolicy.isAllowed)
        .get(claims.list)
        .post(claims.create);

    app.route('/api/claims/:claimId').all(claimsPolicy.isAllowed)
        .get(claims.read)
        .put(claims.update)
        .delete(claims.delete);

    // Finish by binding the Claim middleware
    app.param('claimId', claims.claimByID);
};
