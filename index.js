#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

async function loggify(filePath) {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    console: false
  });

  let fileContent = '';

  readInterface.on('line', function(line) {
    fileContent += line + '\nconsole.log(\'' + line + '\');\n';
  });
  
  readInterface.on('close', async function() {
    await writeFile(filePath, fileContent);
  });
}

module.exports = loggify;
