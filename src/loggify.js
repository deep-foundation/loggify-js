#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function loggify(content) {
    // This function will add console.log statements after each statement in the content
    // TODO: Implement this function
    return content;
}

const filePath = process.argv[2];
const absoluteFilePath = path.resolve(filePath);

const content = fs.readFileSync(absoluteFilePath, 'utf8');
const loggifiedContent = loggify(content);

fs.writeFileSync(absoluteFilePath, loggifiedContent);
