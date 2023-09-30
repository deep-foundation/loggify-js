const assert = require('assert');
const fs = require('fs');
const path = require('path');
const loggify = require('../src/loggifyFunction');

describe('loggify function', () => {
    it('should add console.log statements after each statement in a function', () => {
        const input = 'function test() { let x = 1; let y = 2; return x + y; }';
        const expectedOutput = 'function test() { let x = 1; console.log(\'Executing statement at line 1\'); let y = 2; console.log(\'Executing statement at line 1\'); return x + y; console.log(\'Executing statement at line 1\'); }';
        const output = loggify(input);
        assert.strictEqual(output, expectedOutput);
    });
});

describe('loggify CLI tool', () => {
    it('should modify a file by adding console.log statements after each statement in a function', () => {
        const testFilePath = path.join(__dirname, 'testFile.js');
        fs.writeFileSync(testFilePath, 'function test() { let x = 1; let y = 2; return x + y; }');
        process.argv[2] = testFilePath;
        require('../src/loggify');
        const expectedContent = 'function test() { let x = 1; console.log(\'Executing statement at line 1\'); let y = 2; console.log(\'Executing statement at line 1\'); return x + y; console.log(\'Executing statement at line 1\'); }';
        const actualContent = fs.readFileSync(testFilePath, 'utf8');
        assert.strictEqual(actualContent, expectedContent);
        fs.unlinkSync(testFilePath);
    });
});
