var loaderUtils = require('loader-utils');
var moduleDecompose = require('./lib/module-decompose');

module.exports = function(source) {
  if (this.cacheable) this.cacheable();
  var options = loaderUtils.getOptions(this);

  return moduleDecompose(source, options);
}