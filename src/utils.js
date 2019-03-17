const childProcess = require("child_process");
const path = require("path");

const hasCommand = (cmd, platform) => {
  const nil = platform !== "win32" ? "/dev/null" : "NUL";
  try {
    childProcess.execSync(`which ${cmd} 2>${nil} 2>${nil}`);
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
