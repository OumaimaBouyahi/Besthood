(function () {
  'use strict';

  angular
    .module('claims')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('claims', {
        abstract: true,
        url: '/claims',
        template: '<ui-view/>'
      })
      .state('claims.list', {
        url: '',
        templateUrl: 'modules/claims/client/views/list-claims.client.view.html',
        controller: 'ClaimsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Claims List'
        }
      })
      .state('claims.create', {
        url: '/create',
        templateUrl: 'modules/claims/client/views/form-claim.client.view.html',
        controller: 'ClaimsController',
        controllerAs: 'vm',
        resolve: {
          claimResolve: newClaim
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Claims Create'
        }
      })
      .state('claims.edit', {
        url: '/:claimId/edit',
        templateUrl: 'modules/claims/client/views/form-claim.client.view.html',
        controller: 'ClaimsController',
        controllerAs: 'vm',
        resolve: {
          claimResolve: getClaim
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Claim {{ claimResolve.name }}'
        }
      })
      .state('claims.view', {
        url: '/:claimId',
        templateUrl: 'modules/claims/client/views/view-claim.client.view.html',
        controller: 'ClaimsController',
        controllerAs: 'vm',
        resolve: {
          claimResolve: getClaim
        },
        data:{
          pageTitle: 'Claim {{ claimResolve.name }}'
        }
      });
  }

  getClaim.$inject = ['$stateParams', 'ClaimsService'];

  function getClaim($stateParams, ClaimsService) {
    return ClaimsService.get({
      claimId: $stateParams.claimId
    }).$promise;
  }

  newClaim.$inject = ['ClaimsService'];

  function newClaim(ClaimsService) {
    return new ClaimsService();
  }
})();
