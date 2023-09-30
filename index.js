#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const process = require('process');
const escodegen = require('escodegen');
const parseToCST = require('./parsers/esprimaParser');

function traverseAndLog(node) {
  for (let key in node) {
    if (node[key] && typeof node[key] === 'object') {
      if (node[key].type === 'ExpressionStatement') {
        const logStatement = {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'console'
              },
              property: {
                type: 'Identifier',
                name: 'log'
              }
            },
            arguments: [
              {
                type: 'Literal',
                value: 'Statement executed'
              }
            ]
          }
        };
        node.body.splice(node.body.indexOf(node[key]) + 1, 0, logStatement);
      }
      traverseAndLog(node[key]);
    }
  }
  if (node.type === 'Program') {
    const logStatement = {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'console'
          },
          property: {
            type: 'Identifier',
            name: 'log'
          }
        },
        arguments: [
          {
            type: 'Literal',
            value: 'Statement executed'
          }
        ]
      }
    };
    node.body.push(logStatement);
  }
}

function traverseAndLog(node) {
  for (let key in node) {
    if (node[key] && typeof node[key] === 'object') {
      if (node[key].type === 'ExpressionStatement') {
        const logStatement = {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'console'
              },
              property: {
                type: 'Identifier',
                name: 'log'
              }
            },
            arguments: [
              {
                type: 'Literal',
                value: 'Statement executed'
              }
            ]
          }
        };
        node.body.splice(node.body.indexOf(node[key]) + 1, 0, logStatement);
      }
      traverseAndLog(node[key]);
    }
  }
}

// Get the file argument from the command line
const fileArg = process.argv[2];

// If a file argument has been provided, pass it to the loggify function
if (fileArg) {
  loggify(fileArg);
}

module.exports = loggify;
