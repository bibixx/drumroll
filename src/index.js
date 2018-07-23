#!/usr/bin/env node
const childProcess = require("child_process");

const play = require("./play");
const { getSoundLocation } = require("./utils");

const FILE_DRUMROLL = getSoundLocation("drumroll.mp3");
const FILE_WAH = getSoundLocation("wah.mp3");
const FILE_SUCCESS = getSoundLocation("success.mp3");

const drumrollProcess = play(FILE_DRUMROLL);
let innerCmdCode;

const [,, innerCmd, ...innerArgs] = process.argv;

if (innerCmd) {
  const commandProcess = childProcess.spawn(
    innerCmd,
    innerArgs,
    { stdio: "inherit" }
  );

  commandProcess.on("exit", (code) => {
    innerCmdCode = code;
    if (code !== 0) {
      play(FILE_WAH);
    } else {
      play(FILE_SUCCESS);
    }
  });
}

process.on("exit", () => {
  drumrollProcess.kill();

  process.exit(innerCmdCode);
});