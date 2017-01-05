(function () {
  'use strict';

  angular
    .module('communities')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Communities',
      state: 'communities',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'communities', {
      title: 'List Communities',
      state: 'communities.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'communities', {
      title: 'Create Community',
      state: 'communities.create',
      roles: ['*']
    });
  }
})();
