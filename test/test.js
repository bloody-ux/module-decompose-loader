const assert = require('assert');
const moduleDecompose = require('../lib/module-decompose');

describe('ES6', function() {
  describe('import React from "react"', function() {
    it('should return import React from "react"', function() {
      const source = 'import React from "react"';
      const result = moduleDecompose(source, {
        modules: {
          react: {
            style: false,
            components: '',
            camel2Dash: false,
          }
        }
      });

      assert.equal(source, result);
    });
  });
});