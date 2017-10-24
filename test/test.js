const assert = require('assert');
const moduleDecompose = require('../lib/module-decompose');

describe('Given <import React from \'react\'>', function() {
  describe('When setting with whatever options', function() {
    it('Should return <import React from \'react\'>', function() {
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
});

describe('Given <import { Button } from \'antd\'>', function() {
  describe('When setting with style: false, components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';>', function() {
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
  });

  describe('When setting with style: \'css\', components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style/css\';>', function() {
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
  });

  describe('When setting with style: \'css\', components: \'lv1/lv2\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style/css\';>', function() {
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
  });

  describe('When setting with style: true, components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style\';>', function() {
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

  describe('When setting with style: true, components: \'lib\' and camel2Dash: false', function() {
    it('Should return <import Button from \'antd/lib/Button\';import \'antd/lib/Button/style\';>', function() {
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
});

describe('Given <import { ListItem, PickerView } from \'antd-mobile\'>', function() {
  describe('When setting with style: \'css\', components: \'es\' and camel2Dash: true', function() {
    it('Should return <import ListItem from \'antd-mobile/es/list-item\';import \'antd-mobile/es/list-item/style/css\';import PickerView from \'antd-mobile/es/picker-view\';import \'antd-mobile/es/picker-view/style/css\'>', function() {
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
});

describe('Given import Antd, { ListItem } from \'antd-mobile\'', function() {  
  describe('When setting with style: \'css\', components: \'es\' and camel2Dash: true', function() {
    it('Should return <import ListItem from \'antd-mobile/es/list-item\';import \'antd-mobile/es/list-item/style/css\';import Antd from \'antd-mobile\';>', function() {
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

describe('Given import { debounce } from \'lodash\'', function() {  
  describe('When setting with nothing', function() {
    it('Should return <import debounce from \'lodash/debounce\';>', function() {
      const source = 'import { debounce } from \'lodash\'';
      const target = '\nimport debounce from \'lodash/debounce\';'
      const result = moduleDecompose(source, {
        modules: {
          'lodash': {
            // nothing
          }
        }
      });

      assert.equal(target, result);
    });
  });
});

describe('Given import { debounce, zip } from \'lodash\'', function() {  
  describe('When setting with nothing', function() {
    it('Should return <import debounce from \'lodash/debounce\';import zip from \'lodash/zip\';>', function() {
      const source = 'import { debounce, zip } from \'lodash\'';
      const target = '\nimport debounce from \'lodash/debounce\';\nimport zip from \'lodash/zip\';'
      const result = moduleDecompose(source, {
        modules: {
          'lodash': {
            // nothing
          }
        }
      });

      assert.equal(target, result);
    });
  });
});