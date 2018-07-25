const childProcess = require("child_process");
const utils = require("./utils.js");

const respawns = {};

function play(filename, platform, innerCmd) {
  if (filename === undefined) {
    throw new Error();
  }

  const args = [filename];
  let bin = "play";

  if (platform === "darwin") {
    bin = "afplay";
  }

  if (utils.hasCommand("mplayer")) {
    bin = "mplayer";

    args.unshift("-really-quiet");
  }

  const proc = childProcess.spawn(bin, args);
  proc.stdout.resume();
  proc.stderr.resume();
  proc.unref();

  if (innerCmd !== undefined) {
    proc.stdout.unref();
    proc.stderr.unref();
    proc.stdin.unref();
  }

  respawns[filename] = proc;

  return proc;
}

module.exports = { play };
