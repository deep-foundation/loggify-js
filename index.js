const fs = require('fs');
const esprima = require('esprima');
const escodegen = require('escodegen');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function addLogs(code) {
  const ast = esprima.parseScript(code, { range: true });

  esprima.traverse(ast, node => {
    if (node.type === 'Statement') {
      const logStatement = esprima.parseScript(`console.log(${node.expression.range[0]}, ${node.expression.range[1]});`);
      node.body.splice(node.body.indexOf(node) + 1, 0, logStatement);
    }
  });

  return escodegen.generate(ast);
}

function writeFile(filePath, code) {
  fs.writeFileSync(filePath, code);
}

const filePath = process.argv[2];
const code = readFile(filePath);
const modifiedCode = addLogs(code);
writeFile(filePath, modifiedCode);
