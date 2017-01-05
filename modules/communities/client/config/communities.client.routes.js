(function () {
  'use strict';

  angular
    .module('communities')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('communities', {
        abstract: true,
        url: '/communities',
        template: '<ui-view/>'
      })
      .state('communities.list', {
        url: '',
        templateUrl: 'modules/communities/client/views/list-communities.client.view.html',
        controller: 'CommunitiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Communities List'
        }
      })
      .state('communities.create', {
        url: '/create',
        templateUrl: 'modules/communities/client/views/form-community.client.view.html',
        controller: 'CommunitiesController',
        controllerAs: 'vm',
        resolve: {
          communityResolve: newCommunity
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Communities Create'
        }
      })
      .state('communities.edit', {
        url: '/:communityId/edit',
        templateUrl: 'modules/communities/client/views/form-community.client.view.html',
        controller: 'CommunitiesController',
        controllerAs: 'vm',
        resolve: {
          communityResolve: getCommunity
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Community {{ communityResolve.name }}'
        }
      })
      .state('communities.view', {
        url: '/:communityId',
        templateUrl: 'modules/communities/client/views/view-community.client.view.html',
        controller: 'CommunitiesController',
        controllerAs: 'vm',
        resolve: {
          communityResolve: getCommunity
        },
        data:{
          pageTitle: 'Community {{ communityResolve.name }}'
        }
      });
  }

  getCommunity.$inject = ['$stateParams', 'CommunitiesService'];

  function getCommunity($stateParams, CommunitiesService) {
    return CommunitiesService.get({
      communityId: $stateParams.communityId
    }).$promise;
  }

  newCommunity.$inject = ['CommunitiesService'];

  function newCommunity(CommunitiesService) {
    return new CommunitiesService();
  }
})();
