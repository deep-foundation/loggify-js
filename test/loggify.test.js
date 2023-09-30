const assert = require('assert');
const fs = require('fs');
const loggify = require('../index.js');

describe('loggify', function() {
  it('should add console.log statements after each line', function() {
    const filePath = './sample.js';
    const originalContent = 'let a = 1;\nlet b = 2;\n';
    const expectedContent = 'let a = 1;\nconsole.log(\'let a = 1;\');\nlet b = 2;\nconsole.log(\'let b = 2;\');\n';
    fs.writeFileSync(filePath, originalContent);
    loggify(filePath);
    const modifiedContent = fs.readFileSync(filePath, 'utf8');
    assert.strictEqual(modifiedContent, expectedContent);
  });

  it('should write the modified content back to the file', function() {
    const filePath = './sample2.js';
    const originalContent = 'let x = 3;\nlet y = 4;\n';
    const expectedContent = 'let x = 3;\nconsole.log(\'let x = 3;\');\nlet y = 4;\nconsole.log(\'let y = 4;\');\n';
    fs.writeFileSync(filePath, originalContent);
    loggify(filePath);
    const modifiedContent = fs.readFileSync(filePath, 'utf8');
    assert.strictEqual(modifiedContent, expectedContent);
  });
});
