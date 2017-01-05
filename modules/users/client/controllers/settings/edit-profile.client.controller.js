'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication','CommunitiesService',
  function ($scope, $http, $location, Users ,Authentication, CommunitiesService) {
    $scope.user = Authentication.user;
    $scope.city = Authentication.user.community.city;
    $scope.communities = CommunitiesService.query();
    // Update a user profile
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $scope.$apply(function () {
          $scope.lat = $scope.user.lat;
          $scope.lon = $scope.user.lon;
          $scope.user.lat = position.coords.latitude;
          $scope.user.lon = position.coords.longitude;

        });
      });
    }
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);
