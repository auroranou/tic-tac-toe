'use strict';

const helpers = require('../lib/helpers');
const constants = require('../lib/constants');

it('should check whether one array is contained in another', () => {
  expect(helpers.isSuperSet([0, 1, 2, 3, 4, 5, 6, 7, 8], constants.LINES[0])).toBe(true);
});