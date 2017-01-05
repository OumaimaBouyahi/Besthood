(function () {
  'use strict';

  describe('Claims Route Tests', function () {
    // Initialize global variables
    var $scope,
      ClaimsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ClaimsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ClaimsService = _ClaimsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('claims');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/claims');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ClaimsController,
          mockClaim;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('claims.view');
          $templateCache.put('modules/claims/client/views/view-claim.client.view.html', '');

          // create mock Claim
          mockClaim = new ClaimsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Claim Name'
          });

          //Initialize Controller
          ClaimsController = $controller('ClaimsController as vm', {
            $scope: $scope,
            claimResolve: mockClaim
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:claimId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.claimResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            claimId: 1
          })).toEqual('/claims/1');
        }));

        it('should attach an Claim to the controller scope', function () {
          expect($scope.vm.claim._id).toBe(mockClaim._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/claims/client/views/view-claim.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ClaimsController,
          mockClaim;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('claims.create');
          $templateCache.put('modules/claims/client/views/form-claim.client.view.html', '');

          // create mock Claim
          mockClaim = new ClaimsService();

          //Initialize Controller
          ClaimsController = $controller('ClaimsController as vm', {
            $scope: $scope,
            claimResolve: mockClaim
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.claimResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/claims/create');
        }));

        it('should attach an Claim to the controller scope', function () {
          expect($scope.vm.claim._id).toBe(mockClaim._id);
          expect($scope.vm.claim._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/claims/client/views/form-claim.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ClaimsController,
          mockClaim;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('claims.edit');
          $templateCache.put('modules/claims/client/views/form-claim.client.view.html', '');

          // create mock Claim
          mockClaim = new ClaimsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Claim Name'
          });

          //Initialize Controller
          ClaimsController = $controller('ClaimsController as vm', {
            $scope: $scope,
            claimResolve: mockClaim
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:claimId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.claimResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            claimId: 1
          })).toEqual('/claims/1/edit');
        }));

        it('should attach an Claim to the controller scope', function () {
          expect($scope.vm.claim._id).toBe(mockClaim._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/claims/client/views/form-claim.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
