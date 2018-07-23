const childProcess = require("child_process");
const path = require("path");

const hasCommand = (cmd) => {
  try {
    childProcess.execSync(`which ${cmd} 2>/dev/null 2>/dev/null`);
    return true;
  } catch (err) {
    return false;
  }
};

const getSoundLocation = file => path.join(__dirname, "..", "sounds", file);

module.exports = {
  hasCommand,
  getSoundLocation,
};