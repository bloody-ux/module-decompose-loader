var parse = require('./lib/module-decompose');
var fs = require('fs');


var contents = fs.readFileSync('./test/demo.ts', 'UTF-8');

parse(contents, {
  modules: {
    antd: {
      components: 'lib',
      style: 'css',
      camel2Dash: true,
    },
    required: {

    },
    lodash2: {

    },
    lodash: {
      style: false,
    },
    'antd-mobile': {
      
    },
    lodash3: {

    },
    lodash4: {

    }
  }
});