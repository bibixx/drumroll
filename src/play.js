const childProcess = require("child_process");

const { hasCommand } = require("./utils");

const respawns = {};

function play(filename) {
  if (!filename) {
    throw new Error("No filename given!");
  }

  if (respawns[filename] !== undefined) {
    return respawns[filename];
  }

  const args = [filename];
  let bin = "play";

  if (process.platform === "darwin") {
    bin = "afplay";
  }

  if (hasCommand("mplayer")) {
    bin = "mplayer";

    args.unshift("-really-quiet");
  }

  const proc = childProcess.spawn(bin, args);
  proc.stdout.resume();
  proc.stderr.resume();
  proc.unref();

  proc.on("exit", () => {
    proc.kill();
  });

  if (process.argv[2]) {
    proc.stdout.unref();
    proc.stderr.unref();
    proc.stdin.unref();
  }

  respawns[filename] = proc;

  return proc;
}

module.exports = play;