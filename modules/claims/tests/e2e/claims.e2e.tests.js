'use strict';

describe('Claims E2E Tests:', function () {
  describe('Test Claims page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/claims');
      expect(element.all(by.repeater('claim in claims')).count()).toEqual(0);
    });
  });
});
