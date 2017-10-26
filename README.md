[![npm][npm]][npm-url]
[![node][node]][node-url]
[![license][license]][license-url]
[![tests][tests]][tests-url]


<div align="center">
  <img width="150" height="150"
    src="https://moltin.com/img/svg/languages/js.svg">
  <img src="https://loiane.gallerycdn.vsassets.io/extensions/loiane/ts-extension-pack/0.0.1/1503435730489/Microsoft.VisualStudio.Services.Icons.Default" width="150" height="150">
  <a href="https://github.com/webpack/webpack">
    <img width="150" height="150"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Module Decompose Loader</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev module-decompose-loader
```

<h2 align="center">Usage</h2>

The `module-decompose-loader` reduces bundle size by decomposing `import` statements to more specific module imports.

When we have import statement like below:
``` js
import { Button, IputItem } from 'antd-mobile';
import { debounce } from 'lodash';
```

It will convert to below lines:
``` js
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import InputItem from 'antd/lib/input-item';
import 'antd/lib/input-item/style/css';
import debounce from 'lodash/debounce'
```

### decomposing es6/typescript module import

**antd-mobile-test.js**
```js
import { Button, IputItem } from 'antd-mobile';
console.log(Button, InputItem );
```

**lodash-test.js**
```js
import { debounce } from 'lodash';
console.log(debounce);
```

**webpack.config.js**
```js
module.exports = {
  module: {
    // ...
    rules: [
      {
        enforce: "pre",
        test: /\.(js|ts)$/,
        use: {
          loader: 'module-decompose-loader',
          options: {
            modules: {
              'antd-mobile': {
                components: 'lib',
                style: 'css',
                camel2Dash: true
              },
              lodash: {
                // nothing, but need this empty object literal
              }
            }
          }
        }
      }
    ]
    // ...
  }
}
```

**build result:**

``` bash
> webpack

Hash: 417e4a14fffa92b4e502
Version: webpack 3.8.1
Time: 1435ms
          Asset     Size  Chunks             Chunk Names
 antd-mobile.js   168 kB       0  [emitted]  antd-mobile
      lodash.js  17.8 kB       1  [emitted]  lodash
antd-mobile.css  51.1 kB       0  [emitted]  antd-mobile
  [62] ./antd-mobile-test.js 220 bytes {0} [built]
 [139] ./lodash-test.js 63 bytes {1} [built]
 [143] (webpack)/buildin/global.js 488 bytes {1} [built]
    + 156 hidden modules
```

**compared to(without loader):**

``` bash
> webpack

Hash: c903537458fe95455342
Version: webpack 3.8.1
Time: 2121ms
         Asset     Size  Chunks                    Chunk Names
antd-mobile.js  1.35 MB       0  [emitted]  [big]  antd-mobile
     lodash.js   544 kB       1  [emitted]  [big]  lodash
  [66] (webpack)/buildin/global.js 488 bytes {0} {1} [built]
 [118] ./antd-mobile-test.js 81 bytes {0} [built]
 [349] ./lodash-test.js 57 bytes {1} [built]
 [351] (webpack)/buildin/module.js 495 bytes {1} [built]
    + 348 hidden modules
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`modules`](#modules)**|`{Object}`|`undefined`| The root configuration object |
|**[`modules[moduleName]`](#modulesmodulename)**|`{Object}`| `undefined` | Tell which module to enable decomposing  |
|**[`modules[moduleName].components`](#modulesmodulenamecomponents)**|`{String} | undefined`| `undefined` | Configure the generated import from statement |
|**[`modules[moduleName].style`](#modulesmodulenamestyle)** |`{String | Boolean}`|`false`| Configure whether and how to output css import statement |
|**[`modules[moduleName].camel2Dash`](#modulesmodulenamecamel2dash)**|`{Boolean}`|`false`| Configure whether the path is camel case or dash |

### `modules`
Contains node modules to decompose, if it's not set, warning will be shown and the loader will not take effect.

### `modules[moduleName]`
Every node module to be decomposed should be configured. The object contains configurations for each module, if not set, the module won't get decomposed.

### `modules[moduleName].components`
For `import { debounce } from 'lodash'`, if `components` set to `undefined`, the output is `import debounce from 'lodash/debounce'`; while `components` set to `lv1/lv2`, the output is `import debounce from 'lodash/lv1/lv2/debounce`

The from part generation rule is:
1. when `components` is `undefined`, the result is `${moduleName}/${componentPath}`
2. otherwise the result is `${moduleName}/${componentsDirectory}/${componentPath}`

### `modules[moduleName].style`

This option tells whether to generate style import statement and how to.
When `style` is `falsy`, no style import will be generated, usefull for libraries without UI.
When `style` is `String`, the value is used to generate the from path.  Given `import { Button } from 'antd'`, when `style` is `css/default`, generated style statement will be `import 'antd/button/style/css/default'`.

### `modules[moduleName].camel2Dash`

If the option is `true`, `import { Button } from 'antd'` will generate `import Button from 'antd/button'`;
If not, the result will be `import Button from 'antd/Button'`

<h2 align="center">Nodejs Usage</h2>

``` js
import moduleDecomopse from 'module-decompose-loader/lib/module-decompose';

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
```

``` bash
> node index.js


import Button from 'antd/es/button';
import 'antd/es/button/style/css';
```


<h2 align="center">FAQ</h2>

### Why the bundle is still big

Probable causes:
1. The options is incorrect, which will be reported on console.
2. The module isn't included in `modules` configuration. Please add it to loader options.
3. Used import default. Say `import _, { debounce } from 'lodash'`, in this way, lodash will be fully loaded.



[npm]: https://img.shields.io/badge/npm-v3.10.3-orange.svg
[npm-url]: https://npmjs.com/package/module-decompose-loader

[node]: https://img.shields.io/badge/node-v4.2.0-brightgreen.svg
[node-url]: https://nodejs.org

[license]: https://img.shields.io/packagist/l/doctrine/orm.svg
[license-url]: https://github.com/bloody-ux/module-decompose-loader/blob/master/LICENSE

[tests]: https://img.shields.io/badge/build-passing-brightgreen.svg
[tests-url]: https://travis-ci.org/bloody-ux/module-decompose-loader
