const assert = require('assert');
const moduleDecompose = require('../lib/module-decompose');

describe('ES6 Module', function() {
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
    it('should return <import Button from \'antd/lib/button\';> when style: false, components: \'lib\' and camel2Dash: true', function() {
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

    it('should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style/css\';> when style: \'css\', components: \'lib\' and camel2Dash: true', function() {
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

    it('should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style/css\';> when style: \'css\', components: \'lv1/lv2\' and camel2Dash: true', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lv1/lv2/button\';\nimport \'antd/lv1/lv2/button/style/css\';';
      const result = moduleDecompose(source, {
        modules: {
          antd: {
            style: 'css',
            components: 'lv1/lv2',
            camel2Dash: true,
          }
        }
      });

      assert.equal(result, target);
    });

    it('should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style\';> when style: true, components: \'lib\' and camel2Dash: true', function() {
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

    it('should return <import Button from \'antd/lib/Button\';import \'antd/lib/Button/style\';> when style: true, components: \'lib\' and camel2Dash: false', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/Button\';\nimport \'antd/lib/Button/style\';';
      const result = moduleDecompose(source, {
        modules: {
          antd: {
            style: true,
            components: 'lib',
            camel2Dash: false,
          }
        }
      });

      assert.equal(result, target);
    });
  });

  describe('import { ListItem, PickerView } from \'antd-mobile\'', function() {
    it('should return <import ListItem from \'antd-mobile/es/list-item\';import \'antd-mobile/es/list-item/style/css\';import PickerView from \'antd-mobile/es/picker-view\';import \'antd-mobile/es/picker-view/style/css\'> when style: \'css\', components: \'es\' and camel2Dash: true', function() {
      const source = 'import { ListItem, PickerView } from \'antd-mobile\'';
      const target = '\nimport ListItem from \'antd-mobile/es/list-item\';\nimport \'antd-mobile/es/list-item/style/css\';\nimport PickerView from \'antd-mobile/es/picker-view\';\nimport \'antd-mobile/es/picker-view/style/css\';'
      const result = moduleDecompose(source, {
        modules: {
          'antd-mobile': {
            style: 'css',
            components: 'es',
            camel2Dash: true,
          }
        }
      });

      assert.equal(target, result);
    });
  });

  describe('import Antd, { ListItem } from \'antd-mobile\'', function() {
    it('should return <import ListItem from \'antd-mobile/es/list-item\';import \'antd-mobile/es/list-item/style/css\';import Antd from \'antd-mobile\';> when style: \'css\', components: \'es\' and camel2Dash: true', function() {
      const source = 'import Antd, { ListItem } from \'antd-mobile\'';
      const target = '\nimport ListItem from \'antd-mobile/es/list-item\';\nimport \'antd-mobile/es/list-item/style/css\';\nimport Antd from \'antd-mobile\';'
      const result = moduleDecompose(source, {
        modules: {
          'antd-mobile': {
            style: 'css',
            components: 'es',
            camel2Dash: true,
          }
        }
      });

      assert.equal(target, result);
    });
  });

});