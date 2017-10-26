var ts = require('typescript');
var util = require('./util');
var colors = require('colors');

var NEW_LINE = '\n';

module.exports = function(source, options) {
  if (!options || !options.modules) {
    console.warn('The options of module-decompose-loader is invalid: '.yellow);
    console.warn(JSON.stringify(options));
    console.warn('The loader will be skipped'.yellow);
    return source;
  }

  // init result source
  var resultSource = source;

  // create source file from content
  var sourceFile = ts.createSourceFile(
    'temp.tsx', 
    source,
    ts.ScriptTarget.Latest,
    false, 
    ts.ScriptKind.TSX);

  // process from end to start
  // and then we can replace easily
  var reversedStatements =
    Array.prototype.reverse.call(sourceFile.statements);
  reversedStatements.forEach(function(statement) {
      if (statement.kind === ts.SyntaxKind.ImportDeclaration &&
      statement.importClause && // exclude `import 'xxxxx'` like statement
      statement.importClause.namedBindings && // exclude import xxxx from 'xxxx';
      statement.importClause.namedBindings.elements) {  // exclude import * as xxxx from 'xxxx';
        var moduleName = statement.moduleSpecifier.text;

        var moduleConfig = getModuleConfig(moduleName);
        moduleConfig && decompose(statement, moduleName, moduleConfig);
      }
    }
  );

  return resultSource;

  function decompose(
    statement, 
    moduleName,
    moduleConfig) {
      // added default configuration
      var components = moduleConfig.components;
      var style = moduleConfig.style;
      var camel2Dash = moduleConfig.camel2Dash;

      // {} bindings and default import
      var namedBindings = statement.importClause.namedBindings;
      var name = statement.importClause.name;

      var resultClauses = []; // added newline before result clauses
      namedBindings.elements.forEach(function(element) {
        var componentName = element.name.text;
        var componentPathName = camel2Dash ?
          util.convertCamel2Dash(element.name.text) :
          element.name.text;
        
        // component path in module
        var componentPath = `${moduleName}/${componentPathName}`;
        if (components !== undefined) {
          componentPath = `${moduleName}/${components}/${componentPathName}`;
        }

        // added component js file
        resultClauses.push(`import ${componentName} from '${componentPath}';`)

        // added component css file
        if (style === true) {
          resultClauses.push(`import '${componentPath}/style';`);
        } else if (typeof style === 'string') {
          resultClauses.push(`import '${componentPath}/style/${style}';`);
        }
      });
  
      // if has default import
      if (name) { // statement like import react, {Component} from 'react';
        resultClauses.push(`import ${name.escapedText} from '${moduleName}';`);
      }

      var pos =  statement.pos;
      var end = statement.end;
      var prefix = resultSource.substring(0, pos) + NEW_LINE;
      var postfix = resultSource.substring(end);

      resultSource = prefix + resultClauses.join(NEW_LINE) + postfix;
  }

  function getModuleConfig(moduleName) {
    if (moduleName in options.modules) {
      return options.modules[moduleName]
    }

    return null;
  }
}
