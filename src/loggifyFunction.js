#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

function loggify(content) {
    const ast = esprima.parseScript(content);

    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                for (let i = node.body.body.length - 1; i >= 0; i--) {
                    const statement = node.body.body[i];
                    const logStatement = esprima.parseScript(`console.log('Executing statement at line ${statement.loc.start.line}')`).body[0];
                    node.body.body.splice(i + 1, 0, logStatement);
                }
            }
        }
    });

    return escodegen.generate(ast);
}

const filePath = process.argv[2];
const absoluteFilePath = path.resolve(filePath);

const content = fs.readFileSync(absoluteFilePath, 'utf8');
const loggifiedContent = loggify(content);

fs.writeFileSync(absoluteFilePath, loggifiedContent);
