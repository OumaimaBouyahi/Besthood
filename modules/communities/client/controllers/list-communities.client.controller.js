(function () {
  'use strict';

  angular
    .module('communities')
    .controller('CommunitiesListController', CommunitiesListController);

  CommunitiesListController.$inject = ['$scope','$filter', 'CommunitiesService', 'Admin'];

  function CommunitiesListController($scope, $filter, CommunitiesService, Admin) {
    var vm = this;
    Admin.query(function (data) {
      $scope.members = 0;
      data.forEach(user,function(user) {
        CommunitiesService.query(function (data2) {
          data2.forEach(community, function(community) {
            if (user.community.toString === community._id.toString) {
              $scope.members = $scope.members + 1;
            }
          })
        })
      })
    });
    vm.communities = CommunitiesService.query(function (data) {
      $scope.communities = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 4;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.communities, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
})();
