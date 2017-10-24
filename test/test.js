const assert = require('assert');
const moduleDecompose = require('../lib/module-decompose');

describe('ES6', function() {
  describe('import React from \'react\'', function() {
    it('should return <import React from \'react\'> for whatever options', function() {
      const source = 'import React from \'react\'';
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

  describe('import { Button } from \'antd\'', function() {
    it('should return <import Button from \'antd/lib/button\';> when style: false and camel2Dash: true', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/button\';';
      const result = moduleDecompose(source, {
        modules: {
          antd: {
            style: false,
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(result, target);
    });

    it('should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style/css\';> when style: \'css\' and camel2Dash: true', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/button\';\nimport \'antd/lib/button/style/css\';';
      const result = moduleDecompose(source, {
        modules: {
          antd: {
            style: 'css',
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(result, target);
    });

    it('should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style\';> when style: true and camel2Dash: true', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/button\';\nimport \'antd/lib/button/style\';';
      const result = moduleDecompose(source, {
        modules: {
          antd: {
            style: true,
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(result, target);
    });
  });
});