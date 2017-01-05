(function () {
  'use strict';

  angular
    .module('claims')
    .controller('ClaimsListController', ClaimsListController);

  ClaimsListController.$inject = ['$scope', '$filter', 'ClaimsService', 'Authentication'];
  function ClaimsListController($scope, $filter, ClaimsService, Authentication) {
    var vm = this;
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.user = Authentication.user;
    $scope.claims = [];
    vm.claims = ClaimsService.query(function (data) {
      data.forEach(function(claim) {
        if(claim.isPrivate === false || claim.user.community.city === $scope.user.community.city){
          $scope.claims.push(claim);
          $scope.buildPager();
        }
      });

    });
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 4;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')( $scope.claims, {
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
