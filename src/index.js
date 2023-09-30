// Import the process module
const process = require('process');

// Import the loggify function
const loggify = require('./loggify');

// Check if process.argv[2] exists
if (process.argv[2]) {
  // Call the loggify function with process.argv[2] as the argument
  loggify(process.argv[2]);
}
