(function () {
  'use strict';

  // Claims controller
  angular
    .module('claims')
    .controller('ClaimsController', ClaimsController);

  ClaimsController.$inject = ['$scope', '$state', 'Authentication', 'claimResolve'];
  function ClaimsController ($scope, $state, Authentication, claim) {
    var vm = this;

    vm.authentication = Authentication;
    vm.claim = claim;
    vm.error = null;
    vm.form = {};
    vm.lat = 0;
    vm.lon = 0;
    vm.type = "private";
    vm.remove = remove;
    vm.save = save;
    vm.addComment = addComment;
    vm.claim.votes = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];

    if(vm.claim.isPrivate === true){
      vm.type = "Private";
    }else {
      vm.type = "Public";
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $scope.$apply(function () {
          if(vm.claim._id){
            $scope.lat = vm.claim.lat;
            $scope.lon = vm.claim.lon;
          }else {
            $scope.lat = position.coords.latitude;
            $scope.lon = position.coords.longitude;
          }
          vm.claim.lat = position.coords.latitude;
          vm.claim.lon = position.coords.longitude;

        });
      });
    }
    // Remove existing Claim
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.claim.$remove($state.go('claims.list'));
      }
    }

    // Save Claim
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.claimForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.claim._id) {
        vm.claim.$update(successCallback, errorCallback);
      } else {
        vm.claim.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('claims.view', {
          claimId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }


    // add Comment
    function addComment(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.commentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.claim._id) {
        vm.claim.comments.push({commentData:"hello",user:Authentication.user});
        vm.claim.$update(successCallback, errorCallback);
      } else {
        vm.claim.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('claims.view', {
          claimId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
