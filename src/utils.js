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

const memoize = (fn) => {
  const memo = {};

  return (...args) => {
    const memoKey = args.join("|");
    if (Object.prototype.hasOwnProperty.call(memo, memoKey)) {
      return memo[memoKey];
    }

    const res = fn(...args);

    memo[memoKey] = res;
    return res;
  };
};

module.exports = {
  hasCommand,
  getSoundLocation,
  memoize,
};
