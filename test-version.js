const exec = require('child_process').exec;
const package = require("./package.json");
const cmd = `npm view ${package.name} version`;
const execute = new Promise((resolve, reject) => exec(cmd, function(error, stdout) {
  if (error) {
    return reject(error);
  }

  return resolve(stdout);
} ) );

execute
  .then((stdout) => {
    if ( stdout.trim() === package.version.trim() ) {
      console.error("\x1b[31m%s\x1b[0m", "✘ Package version wasn't updated");
      process.exit(1);
    }
    
    console.log("\x1b[32m%s\x1b[0m", "✔ All test passed!");
  })
  .catch((err) => {
    console.error("\x1b[31m%s\x1b[0m", "✘ Test failed – " + err.message);
    process.exit(1);
  });