const moduleDecompose = require('./lib/module-decompose');

const source = 'import { Button as ButtonX } from \'antd\'';
const actual = moduleDecompose(source, {
  modules: {
    antd: {
      style: false,
      components: 'lib',
      camel2Dash: true,
    }
  }
});

console.log(actual);
    