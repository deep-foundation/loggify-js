#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const process = require('process');
const escodegen = require('escodegen');
const parseToCST = require('./parsers/esprimaParser');

async function loggify(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        const cst = parseToCST(data);
        traverseAndLog(cst);
        const modifiedCode = escodegen.generate(cst);
        fs.writeFile(filePath, modifiedCode, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

parentNode.body.splice(parentNode.body.indexOf(node[key]), 0, logStatement);

// Get the file argument from the command line
const fileArg = process.argv[2];

// If a file argument has been provided, pass it to the loggify function
if (fileArg) {
  loggify(fileArg);
}

module.exports = loggify;
