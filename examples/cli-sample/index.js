const moduleDecompose = require('module-decompose-loader/lib/module-decompose');

const input = `import { Button } from 'antd'`;

const output = moduleDecompose(input, {
  modules: {
    antd: {
      components: 'es',
      style: 'css',
      camel2Dash: true
    }
  }
});

console.log(output);