'use strict';

describe('Communities E2E Tests:', function () {
  describe('Test Communities page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/communities');
      expect(element.all(by.repeater('community in communities')).count()).toEqual(0);
    });
  });
});
