(function () {
  'use strict';

  describe('Claims List Controller Tests', function () {
    // Initialize global variables
    var ClaimsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ClaimsService,
      mockClaim;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ClaimsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ClaimsService = _ClaimsService_;

      // create mock article
      mockClaim = new ClaimsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Claim Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Claims List controller.
      ClaimsListController = $controller('ClaimsListController as vm', {
        $scope: $scope
      });

      //Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockClaimList;

      beforeEach(function () {
        mockClaimList = [mockClaim, mockClaim];
      });

      it('should send a GET request and return all Claims', inject(function (ClaimsService) {
        // Set POST response
        $httpBackend.expectGET('api/claims').respond(mockClaimList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.claims.length).toEqual(2);
        expect($scope.vm.claims[0]).toEqual(mockClaim);
        expect($scope.vm.claims[1]).toEqual(mockClaim);

      }));
    });
  });
})();
