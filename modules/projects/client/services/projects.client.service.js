//Projects service used to communicate Projects REST endpoints
(function () {
  'use strict';

  angular
    .module('projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$resource'];

  function ProjectsService($resource) {
    return $resource('api/projects/:projectId', {
      projectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
