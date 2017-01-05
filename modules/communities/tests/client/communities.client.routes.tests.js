(function () {
  'use strict';

  describe('Communities Route Tests', function () {
    // Initialize global variables
    var $scope,
      CommunitiesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CommunitiesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CommunitiesService = _CommunitiesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('communities');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/communities');
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
          CommunitiesController,
          mockCommunity;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('communities.view');
          $templateCache.put('modules/communities/client/views/view-community.client.view.html', '');

          // create mock Community
          mockCommunity = new CommunitiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Community Name'
          });

          //Initialize Controller
          CommunitiesController = $controller('CommunitiesController as vm', {
            $scope: $scope,
            communityResolve: mockCommunity
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:communityId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.communityResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            communityId: 1
          })).toEqual('/communities/1');
        }));

        it('should attach an Community to the controller scope', function () {
          expect($scope.vm.community._id).toBe(mockCommunity._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/communities/client/views/view-community.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CommunitiesController,
          mockCommunity;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('communities.create');
          $templateCache.put('modules/communities/client/views/form-community.client.view.html', '');

          // create mock Community
          mockCommunity = new CommunitiesService();

          //Initialize Controller
          CommunitiesController = $controller('CommunitiesController as vm', {
            $scope: $scope,
            communityResolve: mockCommunity
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.communityResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/communities/create');
        }));

        it('should attach an Community to the controller scope', function () {
          expect($scope.vm.community._id).toBe(mockCommunity._id);
          expect($scope.vm.community._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/communities/client/views/form-community.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CommunitiesController,
          mockCommunity;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('communities.edit');
          $templateCache.put('modules/communities/client/views/form-community.client.view.html', '');

          // create mock Community
          mockCommunity = new CommunitiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Community Name'
          });

          //Initialize Controller
          CommunitiesController = $controller('CommunitiesController as vm', {
            $scope: $scope,
            communityResolve: mockCommunity
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:communityId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.communityResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            communityId: 1
          })).toEqual('/communities/1/edit');
        }));

        it('should attach an Community to the controller scope', function () {
          expect($scope.vm.community._id).toBe(mockCommunity._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/communities/client/views/form-community.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
