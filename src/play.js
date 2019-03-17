const childProcess = require("child_process");
const fs = require("fs");
const utils = require("./utils.js");

const respawns = {};

function play(filename, platform, innerCmd, loop) {
  if (filename === undefined) {
    throw new Error("No filename provided");
  }

  let args = [filename];
  let bin = "play";

  if (platform === "darwin") {
    bin = "afplay";
  }

  if (platform === "win32") {
    if (utils.hasCommand("vlc", platform)) {
      bin = "vlc";
    } else if (fs.existsSync("C:\\Program Files\\VideoLAN\\VLC\\vlc.exe")) {
      bin = "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe";
    } else if (fs.existsSync("C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe")) {
      bin = "C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe";
    } else {
      throw new Error("No VLC executable found.");
    }

    args = [filename, "-I", "null"];

    if (loop) {
      args.push("--loop");
    } else {
      args.push("--play-and-exit");
      innerCmd = undefined;
    }
  }

  if (platform !== "win32" && utils.hasCommand("mplayer", platform)) {
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
