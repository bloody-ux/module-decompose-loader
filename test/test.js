const assert = require('assert');
const moduleDecompose = require('../lib/module-decompose');

describe('Given <import React from \'react\'>', function() {
  describe('When setting with whatever options', function() {
    it('Should return <import React from \'react\'>', function() {
      const source = 'import React from \'react\'';
      const actual = moduleDecompose(source, {
        modules: {
          react: {
            style: false,
            components: '',
            camel2Dash: false,
          }
        }
      });

      assert.equal(actual, source);
    });
  });
});

describe('Given <import { Button } from \'antd\'>', function() {
  describe('When setting with style: false, components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';>', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/button\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: false,
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: \'css\', components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style/css\';>', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/button\';\nimport \'antd/lib/button/style/css\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: 'css',
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: \'css\', components: \'lv1/lv2\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style/css\';>', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lv1/lv2/button\';\nimport \'antd/lv1/lv2/button/style/css\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: 'css',
            components: 'lv1/lv2',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: true, components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import Button from \'antd/lib/button\';import \'antd/lib/button/style\';>', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/button\';\nimport \'antd/lib/button/style\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: true,
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: true, components: \'lib\' and camel2Dash: false', function() {
    it('Should return <import Button from \'antd/lib/Button\';import \'antd/lib/Button/style\';>', function() {
      const source = 'import { Button } from \'antd\'';
      const target = '\nimport Button from \'antd/lib/Button\';\nimport \'antd/lib/Button/style\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: true,
            components: 'lib',
            camel2Dash: false,
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import { Button as ButtonX } from \'antd\'>', function() {
  describe('When setting with style: false, components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import ButtonX from \'antd/lib/button\';>', function() {
      const source = 'import { Button as ButtonX } from \'antd\'';
      const target = '\nimport ButtonX from \'antd/lib/button\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: false,
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: \'css\', components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import ButtonX from \'antd/lib/button\';import \'antd/lib/button/style/css\';>', function() {
      const source = 'import { Button as ButtonX } from \'antd\'';
      const target = '\nimport ButtonX from \'antd/lib/button\';\nimport \'antd/lib/button/style/css\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: 'css',
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: \'css\', components: \'lv1/lv2\' and camel2Dash: true', function() {
    it('Should return <import ButtonX from \'antd/lib/button\';import \'antd/lib/button/style/css\';>', function() {
      const source = 'import { Button as ButtonX } from \'antd\'';
      const target = '\nimport ButtonX from \'antd/lv1/lv2/button\';\nimport \'antd/lv1/lv2/button/style/css\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: 'css',
            components: 'lv1/lv2',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: true, components: \'lib\' and camel2Dash: true', function() {
    it('Should return <import ButtonX from \'antd/lib/button\';import \'antd/lib/button/style\';>', function() {
      const source = 'import { Button as ButtonX } from \'antd\'';
      const target = '\nimport ButtonX from \'antd/lib/button\';\nimport \'antd/lib/button/style\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: true,
            components: 'lib',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });

  describe('When setting with style: true, components: \'lib\' and camel2Dash: false', function() {
    it('Should return <import ButtonX from \'antd/lib/Button\';import \'antd/lib/Button/style\';>', function() {
      const source = 'import { Button as ButtonX } from \'antd\'';
      const target = '\nimport ButtonX from \'antd/lib/Button\';\nimport \'antd/lib/Button/style\';';
      const actual = moduleDecompose(source, {
        modules: {
          antd: {
            style: true,
            components: 'lib',
            camel2Dash: false,
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import { ListItem, PickerView } from \'antd-mobile\'>', function() {
  describe('When setting with style: \'css\', components: \'es\' and camel2Dash: true', function() {
    it('Should return <import ListItem from \'antd-mobile/es/list-item\';import \'antd-mobile/es/list-item/style/css\';import PickerView from \'antd-mobile/es/picker-view\';import \'antd-mobile/es/picker-view/style/css\'>', function() {
      const source = 'import { ListItem, PickerView } from \'antd-mobile\'';
      const target = '\nimport ListItem from \'antd-mobile/es/list-item\';\nimport \'antd-mobile/es/list-item/style/css\';\nimport PickerView from \'antd-mobile/es/picker-view\';\nimport \'antd-mobile/es/picker-view/style/css\';'
      const actual = moduleDecompose(source, {
        modules: {
          'antd-mobile': {
            style: 'css',
            components: 'es',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import Antd, { ListItem } from \'antd-mobile\'>', function() {  
  describe('When setting with style: \'css\', components: \'es\' and camel2Dash: true', function() {
    it('Should return <import ListItem from \'antd-mobile/es/list-item\';import \'antd-mobile/es/list-item/style/css\';import Antd from \'antd-mobile\';>', function() {
      const source = 'import Antd, { ListItem } from \'antd-mobile\'';
      const target = '\nimport ListItem from \'antd-mobile/es/list-item\';\nimport \'antd-mobile/es/list-item/style/css\';\nimport Antd from \'antd-mobile\';'
      const actual = moduleDecompose(source, {
        modules: {
          'antd-mobile': {
            style: 'css',
            components: 'es',
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import { debounce } from \'lodash\'>', function() {  
  describe('When setting with nothing', function() {
    it('Should return <import debounce from \'lodash/debounce\';>', function() {
      const source = 'import { debounce } from \'lodash\'';
      const target = '\nimport debounce from \'lodash/debounce\';'
      const actual = moduleDecompose(source, {
        modules: {
          lodash: {
            // nothing
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import { add } from \'lodash/fp\'>', function() {  
  describe('When setting with nothing', function() {
    it('Should return <import add from \'lodash/fp/add\';>', function() {
      const source = 'import { add } from \'lodash/fp\'';
      const target = '\nimport add from \'lodash/fp/add\';'
      const actual = moduleDecompose(source, {
        modules: {
          'lodash/fp': {
            // nothing
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import { debounce, zip } from \'lodash\'>', function() {  
  describe('When setting with nothing', function() {
    it('Should return <import debounce from \'lodash/debounce\';import zip from \'lodash/zip\';>', function() {
      const source = 'import { debounce, zip } from \'lodash\'';
      const target = '\nimport debounce from \'lodash/debounce\';\nimport zip from \'lodash/zip\';'
      const actual = moduleDecompose(source, {
        modules: {
          'lodash': {
            // nothing
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import { debounce } from \'lodash\';import { Button } from \'antd\'>', function() {  
  describe('When setting with nothing', function() {
    it('Should return <import debounce from \'lodash/debounce\';import zip from \'lodash/zip\';>', function() {
      const source = 'import { debounce, zip } from \'lodash\'';
      const target = '\nimport debounce from \'lodash/debounce\';\nimport zip from \'lodash/zip\';'
      const actual = moduleDecompose(source, {
        modules: {
          'lodash': {
            // nothing
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});

describe('Given <import * as React from \'react\'>', function() {
  describe('When setting with whatever options', function() {
    it('Should return <import * as React from \'react\'>', function() {
      const source = 'import * as React from \'react\'';
      const actual = moduleDecompose(source, {
        modules: {
          react: {
            style: false,
            components: '',
            camel2Dash: false,
          }
        }
      });

      assert.equal(actual, source);
    });
  });
});

describe('Given invalid import statement <import * as React, { Component } from \'react\'>', function() {
  describe('When setting with whatever options', function() {
    it('Should return the same value as input', function() {
      const source = 'import * as React, { Component } from \'react\'';
      const actual = moduleDecompose(source, {
        modules: {
          react: {
            style: false,
            components: '',
            camel2Dash: false,
          }
        }
      });

      assert.equal(actual, source);
    });
  });
});

describe('Given typescript import equals declaration <import React = require(\'react\')>', function() {
  describe('When setting with whatever options', function() {
    it('Should return the same value as input', function() {
      const source = 'import React = require(\'react\')';
      const actual = moduleDecompose(source, {
        modules: {
          react: {
            style: false,
            components: '',
            camel2Dash: false,
          }
        }
      });

      assert.equal(actual, source);
    });
  });
});

describe('Given import statement <import \'react\'>', function() {
  describe('When setting with whatever options', function() {
    it('Should return the same value as input', function() {
      const source = 'import \'react\'';
      const actual = moduleDecompose(source, {
        modules: {
          react: {
            style: false,
            components: '',
            camel2Dash: false,
          }
        }
      });

      assert.equal(actual, source);
    });
  });
});

describe('Given <import { debounce } from \'lodash\';import { Button } from \'antd\'>', function() {  
  describe('When setting with different options for those two modules', function() {
    it('Should work correctly for both', function() {
      const source = 'import { debounce } from \'lodash\';import { Button } from \'antd\'';
      const target = '\nimport debounce from \'lodash/debounce\';\nimport Button from \'antd/lib/button\';'
      const actual = moduleDecompose(source, {
        modules: {
          lodash: {
            // nothing
          },
          antd: {
            components: 'lib',
            style: false,
            camel2Dash: true,
          }
        }
      });

      assert.equal(actual, target);
    });
  });
});