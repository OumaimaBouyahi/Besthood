

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'weatherService', 'newsService',
    function ($scope, Authentication, weatherService, newsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        console.log($scope.authentication.user);
        if ($scope.authentication.user) {
            $scope.lat = $scope.authentication.user.lat;
            $scope.lon = $scope.authentication.user.lon;
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.$apply(function () {
                        $scope.lat = position.coords.latitude;
                        $scope.lon = position.coords.longitude;
                    });
                });
            }
        }
        function fetchWeather(place) {
            weatherService.getWeather(place).then(function (data) {
                $scope.place = data;
                $scope.place.item.condition.temp = parseInt(($scope.place.item.condition.temp - 32) * 5 / 9);

            });
        }

        function fetchNews(place) {
            newsService.getNews(place).then(function (data) {
                $scope.news = data;

            });
        }

        fetchWeather('ariana');


        $scope.findWeather = function (place) {
            $scope.place = '';
            fetchWeather(place);
        };
        $scope.findNews = function (place) {
            $scope.news = {};
            fetchNews(place);

        };

        fetchNews('coupure d\'eau tunisie');
    }


]);
