//Claims service used to communicate Claims REST endpoints
(function () {
  'use strict';

  angular
    .module('claims').factory('ClaimsService', ClaimsService);

  ClaimsService.$inject = ['$resource'];

  function ClaimsService($resource) {
    return $resource('api/claims/:claimId', {
      claimId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
