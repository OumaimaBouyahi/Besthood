'use strict';
angular.module('core').controller('ContactController', ['$scope', '$http', '$location',
    function($scope, $http, $location) {

        // the naming of our data model is consistent
        $scope.guest = {};
        $scope.sent = false;

        // when the user submits it triggers processForm()
        $scope.processForm = function() {

            // *** IMPORTANT IMPORTANT ***
            // an http request is posted to the server
            // *** IMPORTANT IMPORTANT ***

            $http.post('/sendContact', $scope.guest)
                .success(function(response) {
                    console.log('Success! :D');

                    //logs to browser console (Chrome F12)

                }).error(function(response) {
                    console.log(response);
                });

            $scope.contactForm.$setPristine();
            $scope.guest = {};
            $scope.sent = true;
        };
    }]);
