(function () {
  'use strict';

  angular
    .module('claims')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Claims',
      state: 'claims',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'claims', {
      title: 'List Claims',
      state: 'claims.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'claims', {
      title: 'Create Claim',
      state: 'claims.create',
      roles: ['user']
    });
  }
})();
